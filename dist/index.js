"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alt = exports.anyLetter = exports.anyDigit = exports.map = exports.anyChar = exports.NoMatchError = exports.ParseError = void 0;
class ParseError extends Error {
    constructor(message, state) {
        super(message);
        this.state = state;
    }
}
exports.ParseError = ParseError;
class NoMatchError extends ParseError {
    constructor(msg, state) {
        const message = `${msg} did not match`;
        super(message, state);
    }
}
exports.NoMatchError = NoMatchError;
const anyChar = (input) => [input[0], input.slice(1)];
exports.anyChar = anyChar;
function map(f, s) {
    return [f(s[0]), s[1]];
}
exports.map = map;
const anyDigit = (input) => {
    let [char, rest] = (0, exports.anyChar)(input);
    if (/[0-9]{1}/.test(char)) {
        return [char, rest];
    }
    else {
        throw new NoMatchError("anyDigit", input);
    }
};
exports.anyDigit = anyDigit;
const anyLetter = (input) => {
    let [char, rest] = (0, exports.anyChar)(input);
    if (/[a-zA-Z]{1}/.test(char)) {
        return [char, rest];
    }
    else {
        throw new NoMatchError("anyLetter", input);
    }
};
exports.anyLetter = anyLetter;
const alt = (parsers) => {
    return (input) => {
        for (let p of parsers) {
            try {
                return p(input);
            }
            catch (e) {
                if (e instanceof NoMatchError) {
                    continue;
                }
                else {
                    throw e;
                }
            }
        }
        throw new NoMatchError("alt", input);
    };
};
exports.alt = alt;
