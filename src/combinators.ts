import { F, NoMatchError } from "./types";

export const alt = <O>(parsers: Array<F<O>>): F<O> => {
  return (input: string) => {
    for (let p of parsers) {
      try {
        return p(input);
      } catch (e) {
        if (e instanceof NoMatchError) {
          continue;
        } else {
          throw e;
        }
      }
    }
    throw new NoMatchError("alt", input);
  };
};

export const andSkip = (p: F<any>): F<string> => {
  return (input: string) => {
    const [_, rest] = p(input);
    return ["", rest];
  };
};

export function foldMany<O, A>(
  p: F<O>,
  init: A,
  accF: (v: O, a: A) => A,
): F<A> {
  return (input: string) => {
    let acc = init;
    let rest = input;
    while (true) {
      try {
        const [v, r] = p(rest);
        acc = accF(v, acc);
        rest = r;
      } catch (e: any) {
        if (e instanceof NoMatchError) {
          break;
        }
      }
    }
    return [acc, rest];
  };
}

export function skipMany(p: F<any>): F<string> {
  return foldMany(p, "", () => "");
}

export function foldManyString(p: F<string>): F<string> {
  return foldMany(p, "", (v, acc) => acc + v);
}
