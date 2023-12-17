"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sparser = __importStar(require("./index"));
describe("sparser", () => {
    describe("anyChar", () => {
        it("parses string", () => {
            const s = "foo";
            const expected = ["f", "oo"];
            expect(sparser.anyChar(s)).toEqual(expected);
        });
        it("throws error on empty string", () => {
            try {
                sparser.anyChar("");
            }
            catch (e) {
                expect(e).toBeInstanceOf(sparser.UnexpectedEndOfInputError);
            }
        });
    });
    describe("anyDigit", () => {
        it("parses digit", () => {
            const s = "1foo";
            const expected = ["1", "foo"];
            expect(sparser.anyDigit(s)).toEqual(expected);
        });
        it("parses only one digit", () => {
            const s = "12foo";
            const expected = ["1", "2foo"];
            expect(sparser.anyDigit(s)).toEqual(expected);
        });
        it("throws error on non-digit", () => {
            try {
                sparser.anyDigit("foo");
            }
            catch (e) {
                expect(e).toBeInstanceOf(sparser.NoMatchError);
                expect(e.message).toMatch(/anyDigit/);
            }
        });
    });
    describe("anyLetter", () => {
        it("parses one letter", () => {
            const s = "afoo";
            const expected = ["a", "foo"];
            expect(sparser.anyLetter(s)).toEqual(expected);
        });
        it("throws error on non-letter", () => {
            try {
                sparser.anyLetter("1foo");
            }
            catch (e) {
                expect(e).toBeInstanceOf(sparser.NoMatchError);
                expect(e.message).toMatch(/anyLetter/);
            }
        });
    });
    describe("alt", () => {
        it("combines parsers", () => {
            const input = "1foo";
            const parsers = [sparser.anyLetter, sparser.anyDigit];
            const expected = ["1", "foo"];
            expect(sparser.alt(parsers)(input)).toEqual(expected);
        });
        it("errors if all fail", () => {
            const input = "@foo";
            const parsers = [sparser.anyLetter, sparser.anyDigit];
            try {
                sparser.alt(parsers)(input);
            }
            catch (e) {
                expect(e).toBeInstanceOf(sparser.NoMatchError);
                expect(e.message).toMatch(/alt/);
            }
        });
    });
    it("map", () => {
        const input = ["1", "a"];
        const expected = [1, "a"];
        expect(sparser.map(parseInt, input)).toEqual(expected);
    });
});
