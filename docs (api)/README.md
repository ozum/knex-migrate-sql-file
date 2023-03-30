knex-migrate-sql-file

# knex-migrate-sql-file

## Table of contents

### Functions

- [down](README.md#down)
- [up](README.md#up)

## Functions

### down

▸ **down**(`knex`): `Promise`<`any`\>

Reads `.down.sql` file and executes it using `knex.raw()` method.

**`Example`**

```ts
export { up, down } from "knex-migrate-sql-file";
```

#### Parameters

| Name   | Type                    | Description           |
| :----- | :---------------------- | :-------------------- |
| `knex` | `Knex`<`any`, `any`[]\> | is the knex instance. |

#### Returns

`Promise`<`any`\>

the the knex instance.

#### Defined in

migration.ts:48

---

### up

▸ **up**(`knex`): `Promise`<`any`\>

Reads `.up.sql` file and executes it using `knex.raw()` method.

**`Example`**

```ts
export { up, down } from "knex-migrate-sql-file";
```

#### Parameters

| Name   | Type                    | Description           |
| :----- | :---------------------- | :-------------------- |
| `knex` | `Knex`<`any`, `any`[]\> | is the knex instance. |

#### Returns

`Promise`<`any`\>

the the knex instance.

#### Defined in

migration.ts:34
