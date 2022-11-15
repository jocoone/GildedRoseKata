import { runFixture } from "../golden-master-text-test";
import * as fs from "fs";

describe("Gilded Rose", () => {
  it("should test fixture with 30 days", () => {
    const result = runFixture(30);
    const expected = fs.readFileSync("../texttests/ThirtyDays/stdout.gr", { encoding: "utf-8" });
    expect(result).toEqual(expected);
  });
});
