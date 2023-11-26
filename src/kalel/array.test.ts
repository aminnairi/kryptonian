import { describe, test, expect } from "vitest";
import { length, lengthBetween, maximumLength, minimumLength, nonEmpty } from "./array";

describe("array", () => {
  describe("length", () => {
    test("It should return a rule", () => {
      const rule = length({
        length: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid([1, 2])).toEqual(true);
      expect(rule.valid([2])).toEqual(false);
    });
  });

  describe("lengthBetween", () => {
    test("It should return a rule", () => {
      const rule = lengthBetween({
        minimum: 2,
        maximum: 4,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid([1, 2, 3])).toEqual(true);
      expect(rule.valid([2, 3, 4, 5, 6])).toEqual(false);
    });
  });

  describe("minimumLength", () => {
    test("It should return a rule", () => {
      const rule = minimumLength({
        minimum: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid([1, 2, 3])).toEqual(true);
      expect(rule.valid([2])).toEqual(false);
    });
  });

  describe("maximumLength", () => {
    test("It should return a rule", () => {
      const rule = maximumLength({
        maximum: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid([1, 2])).toEqual(true);
      expect(rule.valid([2, 3, 4])).toEqual(false);
    });
  });

  describe("nonEmpty", () => {
    test("It should return a rule", () => {
      const rule = nonEmpty({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid([1, 2, 3])).toEqual(true);
      expect(rule.valid([])).toEqual(false);
    });
  });
});