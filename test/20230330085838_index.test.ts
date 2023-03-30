import type { Knex } from "knex";
import { upSQL, downSQL } from "../src/index";

const stubKnex = { raw: (sql) => sql } as Knex;

describe("function", () => {
  describe("upSQL()", () => {
    it("should execute knex.raw() for .up.sql file", async () => {
      expect.assertions(1);
      const sql = await upSQL(stubKnex);
      expect(sql).toBe("SELECT 'up'\n");
    });
  });

  describe("down()", () => {
    it("should execute knex.raw() for .down.sql file", async () => {
      expect.assertions(1);
      const sql = await downSQL(stubKnex);
      expect(sql).toBe("SELECT 'down'\n");
    });
  });
});
