const { up, down, sync } = require("./index");

const stubKnex = {
  raw: sql => sql,
};

describe("Function", () => {
  describe("up()", () => {
    it("should execute knex.raw() for up sql file", async () => {
      expect(await up(stubKnex)).toBe("SELECT 'up'\n");
    });
  });

  describe("down()", () => {
    it("should execute knex.raw() for down sql file", async () => {
      expect(await down(stubKnex)).toBe("SELECT 'down'\n");
    });
  });

  describe("sync.up()", () => {
    it("should execute knex.raw() for up sql file", () => {
      expect(sync.up(stubKnex)).toBe("SELECT 'up'\n");
    });
  });

  describe("sync.down()", () => {
    it("should execute knex.raw() for down sql file", () => {
      expect(sync.down(stubKnex)).toBe("SELECT 'down'\n");
    });
  });
});
