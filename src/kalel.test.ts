import { test, expect } from "vitest";
import { text } from "./kalel";

test("should return true", () => {
  expect(text({
    message: "Message",
    rules: []
  })).toEqual({
    type: "text",
    message: "Message",
    rules: []
  });
});