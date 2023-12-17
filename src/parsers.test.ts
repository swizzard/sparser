import { anyChar, anyDigit, anyLetter, token } from "./parsers";
import { NoMatchError, UnexpectedEndOfInputError } from "./types";

describe("anyChar", () => {
  it("parses string", () => {
    const s = "foo";
    const expected = ["f", "oo"];
    expect(anyChar(s)).toEqual(expected);
  });
  it("throws error on empty string", () => {
    try {
      anyChar("");
    } catch (e) {
      expect(e).toBeInstanceOf(UnexpectedEndOfInputError);
    }
  });
});
describe("anyDigit", () => {
  it("parses digit", () => {
    const s = "1foo";
    const expected = ["1", "foo"];
    expect(anyDigit(s)).toEqual(expected);
  });
  it("parses only one digit", () => {
    const s = "12foo";
    const expected = ["1", "2foo"];
    expect(anyDigit(s)).toEqual(expected);
  });
  it("throws error on non-digit", () => {
    try {
      anyDigit("foo");
    } catch (e: any) {
      expect(e).toBeInstanceOf(NoMatchError);
      expect(e.message).toMatch(/anyDigit/);
    }
  });
});
describe("anyLetter", () => {
  it("parses one letter", () => {
    const s = "afoo";
    const expected = ["a", "foo"];
    expect(anyLetter(s)).toEqual(expected);
  });
  it("throws error on non-letter", () => {
    try {
      anyLetter("1foo");
    } catch (e: any) {
      expect(e).toBeInstanceOf(NoMatchError);
      expect(e.message).toMatch(/anyLetter/);
    }
  });
});
describe("token", () => {
  it("parses token", () => {
    const input = "foobar";
    const p = token("foo");
    const expected = ["foo", "bar"];
    expect(p(input)).toEqual(expected);
  });
});
