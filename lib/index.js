const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

function getParent(level = 2) {
  const _ = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _;
  return stack[level];
}

function getSQLFileName(type) {
  const migrationFile = getParent().getFileName();
  const sqlFile = path.join(__dirname, `${path.basename(migrationFile, ".js")}.${type}.sql`);
  return sqlFile;
}

/**
 * Reads `.up.sql` file and executes it using `knex.raw()` method.
 * @param {Knex}    knex    - Knex object
 * @param {Promise} Promise - Promise
 * @async
 * @example
 * exports = require("knex-migrate-sql-file");
 */
async function up(knex, Promise) {
  const sql = await readFile(getSQLFileName("up"), "utf8");
  return knex.raw(sql);
}

/**
 * Reads `.down.sql` file and executes it using `knex.raw()` method.
 * @param {Knex}    knex    - Knex object
 * @param {Promise} Promise - Promise
 * @async
 * @example
 * exports = require("knex-migrate-sql-file");
 */
async function down(knex, Promise) {
  const sql = await readFile(getSQLFileName("down"), "utf8");
  return knex.raw(sql);
}

/**
 * Reads `.up.sql` file (sync) and executes it using `knex.raw()` method.
 * @param {Knex}    knex    - Knex object
 * @param {Promise} Promise - Promise
 * @async
 * @example
 * exports = require("knex-migrate-sql-file").sync;
 */
function upSync(knex, Promise) {
  const sql = fs.readFileSync(getSQLFileName("up"), "utf8");
  return knex.raw(sql);
}

/**
 * Reads `.down.sql` file (sync) and executes it using `knex.raw()` method.
 * @param {Knex}    knex    - Knex object
 * @param {Promise} Promise - Promise
 * @async
 * @example
 * exports = require("knex-migrate-sql-file").sync;
 */
function downSync(knex, Promise) {
  const sql = fs.readFileSync(getSQLFileName("down"), "utf8");
  return knex.raw(sql);
}

module.exports = { up, down, sync: { up: upSync, down: downSync } };
