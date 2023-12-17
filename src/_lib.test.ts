import { _slice } from "./_lib";
import { UnexpectedEndOfInputError } from "./types";

describe("_slice", () => {
  it("slices string", () => {
    const input = "foobar";
    const expected = ["foo", "bar"];
    expect(_slice(input, 3)).toEqual(expected);
  });
  it("throws error if input too short", () => {
    const input = "foo";
    try {
      _slice(input, 4);
    } catch (e: any) {
      expect(e).toBeInstanceOf(UnexpectedEndOfInputError);
    }
  });
});
