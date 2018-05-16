# knex-migrate-sql-file

Use sql files instead of `knex.schema` methods.

Exports `up` and `down` functions whichs executes `knex.raw()` method on SQL files having same file name appended `.up.sql` and `.down.sql`.

# Synopsis

1. Create `knex` migration file
1. Import this library in migration file
1. Create SQL files

```sh
$ knex migrate:make add-user-table
Created Migration: /some/path/20180516163212_add-user-table.js
```

**/some/path/20180516163212_add-user-table.js**

```js
//                    Don't forget function call ⤵
module.exports = require("knex-migrate-sql-file")();
```

**/some/path/20180516163212_add-user-table.up.sql**

```sql
CREATE TABLE "user"
```

**/some/path/20180516163212_add-user-table.down.sql**

```sql
DROP TABLE "user"
```

You can override `up` or `down` function according to your needs.

# API
## Functions

<dl>
<dt><a href="#up">up(knex, Promise)</a></dt>
<dd><p>Reads <code>.up.sql</code> file and executes it using <code>knex.raw()</code> method.</p>
</dd>
<dt><a href="#down">down(knex, Promise)</a></dt>
<dd><p>Reads <code>.down.sql</code> file and executes it using <code>knex.raw()</code> method.</p>
</dd>
</dl>

<a name="up"></a>

## up(knex, Promise)
Reads `.up.sql` file and executes it using `knex.raw()` method.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| knex | <code>Knex</code> | Knex object |
| Promise | <code>Promise</code> | Promise |

**Example**  
```js
module.exports = require("knex-migrate-sql-file")();
```
<a name="down"></a>

## down(knex, Promise)
Reads `.down.sql` file and executes it using `knex.raw()` method.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| knex | <code>Knex</code> | Knex object |
| Promise | <code>Promise</code> | Promise |

**Example**  
```js
module.exports = require("knex-migrate-sql-file")();
```
