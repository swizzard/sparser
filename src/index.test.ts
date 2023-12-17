import { map } from "./index";

it("map", () => {
  const input = ["1", "a"];
  const expected = [1, "a"];
  expect(map(parseInt, input as any)).toEqual(expected);
});
