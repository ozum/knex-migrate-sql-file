import { parse, join } from "node:path";
import { readFile } from "node:fs/promises";
import callerPath from "caller-path";
import type { Knex } from "knex";

/**
 * Generates sql file path for the given type. Uses caller files path from stack
 * to determine the migration file path.
 *
 * @param type is the type for the SQL file.
 * @returns the file path.
 */
function generateSQLFilePath(type: "up" | "down"): string {
  const stack = [];
  for (let i = 0; i <= 15; i += 1) {
    const currentPath = callerPath({ depth: i });
    if (currentPath === undefined) continue; // eslint-disable-line no-continue
    stack.push(currentPath);
    const { dir, name } = parse(currentPath.replace("file://", ""));
    if (name.match(/^\d{14,}_/)) return `${join(dir, name)}.${type}.sql`;
  }
  throw new Error(`Cannot find migration file path. Stack:\n${stack.join("\n")}`);
}

/**
 * Reads `.up.sql` file and executes it using `knex.raw()` method.
 *
 * @param knex is the knex instance.
 * @returns the the knex instance.
 *
 * @example
 * import { upSQL } from "knex-migrate-sql-file";
 * export async function up(knex: Knex): Promise<void> {
 *   await upSQL(knex);
 * }
 */
export async function upSQL(knex: Knex) {
  const sql = await readFile(generateSQLFilePath("up"), "utf8");
  return knex.raw(sql);
}

/**
 * Reads `.down.sql` file and executes it using `knex.raw()` method.
 *
 * @param knex is the knex instance.
 * @returns the the knex instance.
 *
 * @example
 * import { downSQL } from "knex-migrate-sql-file";
 * export async function down(knex: Knex): Promise<void> {
 *   await downSQL(knex);
 * }
 */
export async function downSQL(knex: Knex) {
  const sql = await readFile(generateSQLFilePath("down"), "utf8");
  return knex.raw(sql);
}

/**
 * Creates `up` and `down` functions which could be directly exported from a `knex` migration.
 *
 * @returns `up` and `down` functions.
 *
 * @example
 * import getMigrators from "knex-migrate-sql-file";
 * export const { up, down } = getMigrators();
 */
export function getMigrators() {
  const sqlFile = { up: generateSQLFilePath("up"), down: generateSQLFilePath("down") };
  return {
    up: async (knex: Knex) => knex.raw(await readFile(sqlFile.up, "utf8")),
    down: async (knex: Knex) => knex.raw(await readFile(sqlFile.down, "utf8")),
  };
}
