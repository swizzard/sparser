import { UnexpectedEndOfInputError } from "./types";

export const _slice = (input: string, n: number): [string, string] => {
  const start = input.slice(0, n);
  if (start.length < n) {
    throw new UnexpectedEndOfInputError(input);
  } else {
    const rest = input.slice(n);
    return [start, rest];
  }
};
