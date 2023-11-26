import { describe, test, expect } from "vitest";
import { email, length, minimumLength } from "./string";

describe("string", () => {
  describe("length", () => {
    test("It should return a rule", () => {
      const rule = length({
        length: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid("")).toEqual(false);
      expect(rule.valid("ab")).toEqual(true);
    });
  });

  describe("minimumLength", () => {
    test("It should return a rule", () => {
      const rule = minimumLength({
        minimum: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid("")).toEqual(false);
      expect(rule.valid("ab")).toEqual(true);
    });
  });

  describe("email", () => {
    test("It should return a rule", () => {
      const rule = email({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid("email@domain.com")).toEqual(true);
      expect(rule.valid("email@domain")).toEqual(false);
    });
  });
});