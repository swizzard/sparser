export { S, F, ParseError } from "./types";
export * as combinators from "./combinators";
export * as parsers from "./parsers";
import { F, S, NoMatchError, UnexpectedEndOfInputError } from "./types";
export function map<O1, O2>(f: (i: O1) => O2, s: S<O1>): S<O2> {
  return [f(s[0]), s[1]];
}
