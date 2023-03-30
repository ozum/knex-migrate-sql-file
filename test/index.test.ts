import type { Knex } from "knex";
import { upSQL } from "../src/index";

const stubKnex = { raw: (sql) => sql } as Knex;

describe("function", () => {
  describe("upSQL()", () => {
    it("should should throw if file path cannot be found.", async () => {
      expect.assertions(1);
      await expect(() => upSQL(stubKnex)).rejects.toThrow("Cannot find");
    });
  });
});
