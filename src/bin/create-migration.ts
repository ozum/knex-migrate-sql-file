#!/usr/bin/env node
/* eslint-disable no-console */
import { writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import { execa } from "execa";

function findCreatedFilePath(stdout: string): string {
  const lastLine = stdout.split("\n").pop();

  if (lastLine !== undefined) {
    const [, message, filePath] = lastLine.match(/(Created Migration: )(.+)$/) ?? [];
    if (message === "Created Migration: ") return filePath;
  }

  throw new Error("Cannot determine migration file path.");
}

async function createMigrationFile(): Promise<string> {
  const params = ["migrate:make", ...process.argv.slice(2)];
  const { stdout } = await (execa("knex", params, { preferLocal: true }) as any).pipeStdout(process.stdout);
  return findCreatedFilePath(stdout);
}

function getMigrationCode(): string {
  const getFilePathCode = (type: "up" | "down") => `\`\${join(dirname(file), basename(file, extname(file)))}.${type}.sql\``;

  return `import { Knex } from "knex";
import { readFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

export async function up(knex: Knex): Promise<void> {
  const file = fileURLToPath(import.meta.url);
  const sql = await readFile(${getFilePathCode("up")}, "utf8");
  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  const file = fileURLToPath(import.meta.url);
  const sql = await readFile(${getFilePathCode("down")}, "utf8");
  await knex.raw(sql);
}
  `;
}

async function createFiles() {
  const filePath = await createMigrationFile();
  const code = getMigrationCode();
  const { dir, name } = parse(filePath);
  const sqlFilePath = { up: `${join(dir, name)}.up.sql`, down: `${join(dir, name)}.down.sql` };
  await Promise.all([writeFile(filePath, code, "utf8"), writeFile(sqlFilePath.up, "", "utf8"), writeFile(sqlFilePath.down, "", "utf8")]);
  console.log(`Created SQL File:  ${sqlFilePath.up}`);
  console.log(`Created SQL File:  ${sqlFilePath.down}`);
}

await createFiles();
