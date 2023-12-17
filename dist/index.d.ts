export type S<O> = [O, string];
export type F<O> = (input: string) => S<O>;
export declare class ParseError extends Error {
    state: string;
    constructor(message: string, state: string);
}
export declare class NoMatchError extends ParseError {
    constructor(msg: string, state: string);
}
export declare const anyChar: F<string>;
export declare function map<O1, O2>(f: (i: O1) => O2, s: S<O1>): S<O2>;
export declare const anyDigit: F<string>;
export declare const anyLetter: F<string>;
export declare const alt: <O>(parsers: F<O>[]) => F<O>;
