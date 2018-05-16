const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

// level = 2 : up -> getSQLFileName -> getParent
function getParent(level = 2) {
  const _ = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _;
  return stack[level];
}

function getSQLFileName(type) {
  const migrationFile = getParent().getFileName();
  const sqlFile = path.join(path.dirname(migrationFile), `${path.basename(migrationFile, ".js")}.${type}.sql`);
  return sqlFile;
}

function exportFunctions() {
  const sqlFile = { up: getSQLFileName("up"), down: getSQLFileName("down") };
  return {
    /**
     * Reads `.up.sql` file and executes it using `knex.raw()` method.
     * @param {Knex}    knex    - Knex object
     * @param {Promise} Promise - Promise
     * @async
     * @example
     * module.exports = require("knex-migrate-sql-file")();
     */
    up: async function up(knex, Promise) {
      const sql = await readFile(sqlFile.up, "utf8");
      return knex.raw(sql);
    },
    /**
     * Reads `.down.sql` file and executes it using `knex.raw()` method.
     * @param {Knex}    knex    - Knex object
     * @param {Promise} Promise - Promise
     * @async
     * @example
     * module.exports = require("knex-migrate-sql-file")();
     */
    down: async function up(knex, Promise) {
      const sql = await readFile(sqlFile.down, "utf8");
      return knex.raw(sql);
    },
  };
}

module.exports = exportFunctions;
