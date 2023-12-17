import { alt, andSkip, foldMany } from "./combinators";
import { anyLetter, anyDigit } from "./parsers";
import { NoMatchError } from "./types";

describe("alt", () => {
  it("combines parsers", () => {
    const input = "1foo";
    const parsers = [anyLetter, anyDigit];
    const expected = ["1", "foo"];
    expect(alt(parsers)(input)).toEqual(expected);
  });
  it("errors if all fail", () => {
    const input = "@foo";
    const parsers = [anyLetter, anyDigit];
    try {
      alt(parsers)(input);
    } catch (e: any) {
      expect(e).toBeInstanceOf(NoMatchError);
      expect(e.message).toMatch(/alt/);
    }
  });
});
describe("andSkip", () => {
  it("runs parser and skips result", () => {
    const input = "foo";
    const parser = andSkip(anyLetter);
    const expected = ["", "oo"];
    expect(parser(input)).toEqual(expected);
  });
  it("surfaces thrown errors", () => {
    const input = "foo";
    const parser = andSkip(anyDigit);
    try {
      parser(input);
    } catch (e: any) {
      expect(e).toBeInstanceOf(NoMatchError);
      expect(e.message).toMatch(/anyDigit/);
    }
  });
});
describe("foldMany", () => {
  it("parses until failure, folding results", () => {
    const input = "123foo";
    const p = foldMany(anyDigit, 0, (v: string, a: number) => a + parseInt(v));
    const expected = [6, "foo"];
    expect(p(input)).toEqual(expected);
  });
});
