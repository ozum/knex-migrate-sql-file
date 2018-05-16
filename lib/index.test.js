const { up, down } = require("./index")();

const stubKnex = {
  raw: sql => sql,
};

describe("Function", () => {
  describe("up()", () => {
    it("should execute knex.raw() for .up.sql file", async () => {
      expect(await up(stubKnex)).toBe("SELECT 'up'\n");
    });
  });

  describe("down()", () => {
    it("should execute knex.raw() for .down.sql file", async () => {
      expect(await down(stubKnex)).toBe("SELECT 'down'\n");
    });
  });
});
