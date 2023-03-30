# knex-migrate-sql-file

Use sql files instead of (or in addition to) `knex.schema` methods.

Exports `getMigrators`, `upSQL` and `downSQL` functions which executes `knex.raw()` method on SQL files having same file name appended `.up.sql` and `.down.sql`.

# Usage

Add one of the below scripts to the `package.json` based on your usage (with TypeScript ESM support):

```json
{
  "scripts": {
    "knex": "NODE_OPTIONS='--experimental-vm-modules --loader ts-node/esm' dotenv knex",
    "knex:sqlmigration": "NODE_OPTIONS='--experimental-vm-modules --loader ts-node/esm' sqlmigration"
  }
}
```

# Alternative 1: Generate Files

- Execute generator. It creates migration file and SQL files. Created files are dependency free. (They are are not dependent to this library.)

```sh
$ npm run knex:sqlmigration add-user-table
```

# Alternative 2: Export from Migration File

- Create `knex` migration file.
- Create SQL files.
- Export functions of this library from migration file.

```sh
$ npm run knex migrate:make add-user-table
```

**/db/migrations/20180516163212_add-user-table.js**

```ts
import getMigrators from "knex-migrate-sql-file";

export const { up, down } = getMigrators();
```

**/db/migrations/20180516163212_add-user-table.up.sql**

```sql
CREATE TABLE "user" (...);
```

**/db/migrations/20180516163212_add-user-table.down.sql**

```sql
DROP TABLE "user";
```


# Alternative 3: Use Functions

- Create `knex` migration file.
- Create SQL files.
- Use functions of this library in the migration file.

```sh
$ npm run knex migrate:make add-user-table
```

**/db/migrations/20180516163212_add-user-table.js**

```js
import { upSQL, downSQL } from "knex-migrate-sql-file";
 
export async function up(knex: Knex): Promise<void> {
  await upSQL(knex);
}

export async function down(knex: Knex): Promise<void> {
  await downSQL(knex);
}
```

**/db/migrations/20180516163212_add-user-table.up.sql**

```sql
CREATE TABLE "user" (...);
```

**/db/migrations/20180516163212_add-user-table.down.sql**

```sql
DROP TABLE "user";
```
