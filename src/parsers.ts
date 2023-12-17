import { F, NoMatchError, UnexpectedEndOfInputError } from "./types";
import { _slice } from "./_lib";

export const anyChar: F<string> = (input: string) => {
  if (input.length > 0) {
    return [input[0], input.slice(1)];
  } else {
    throw new UnexpectedEndOfInputError(input);
  }
};
export const anyDigit: F<string> = (input: string) => {
  let [char, rest] = anyChar(input);
  if (/[0-9]{1}/.test(char)) {
    return [char, rest];
  } else {
    throw new NoMatchError("anyDigit", input);
  }
};

export const anyLetter: F<string> = (input: string) => {
  let [char, rest] = anyChar(input);
  if (/[a-zA-Z]{1}/.test(char)) {
    return [char, rest];
  } else {
    throw new NoMatchError("anyLetter", input);
  }
};

export const token = (s: string): F<string> => {
  return (input: string) => {
    const [toMatch, rest] = _slice(input, s.length);
    if (toMatch === s) {
      return [toMatch, rest];
    } else {
      throw new NoMatchError(`token(${s})`, input);
    }
  };
};

export const whitespace: F<string> = (input: string) => {
  const [toMatch, rest] = _slice(input, 1);
  if (/\s/.test(toMatch)) {
    return [toMatch, rest];
  } else {
    throw new NoMatchError(`whitespace`, input);
  }
};

export const whitespaceMany: F<string> = (input: string) => {
  try {
    const [matched, _etc] = /\s+/.exec(input) ?? [];
    if (matched && matched.length) {
      const [_, rest] = _slice(input, matched.length);
      return [matched, rest];
    } else {
      throw new NoMatchError(`whitespaceMany`, input);
    }
  } catch (e: any) {
    throw new NoMatchError(`whitespaceMany`, input);
  }
};
