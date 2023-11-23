import { describe, test, expect } from "vitest";
import { before, between, after } from "./date";

describe("date", () => {
  describe("between", () => {
    test("It should return a rule", () => {
      const rule = between({
        minimum: new Date(2023, 0, 1, 0, 0, 0),
        maximum: new Date(2025, 0, 1, 0, 0, 0),
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(new Date(2024, 0, 1, 0, 0, 0))).toEqual(true);
      expect(rule.valid(new Date(2021, 0, 1, 0, 0, 0))).toEqual(false);
    });
  });

  describe("before", () => {
    test("It should return a rule", () => {
      const rule = before({
        date: new Date(2025, 0, 1, 0, 0, 0),
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(new Date(2024, 0, 1, 0, 0, 0))).toEqual(true);
      expect(rule.valid(new Date(2026, 0, 1, 0, 0, 0))).toEqual(false);
    });
  });

  describe("after", () => {
    test("It should return a rule", () => {
      const rule = after({
        date: new Date(2025, 0, 1, 0, 0, 0),
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(new Date(2026, 0, 1, 0, 0, 0))).toEqual(true);
      expect(rule.valid(new Date(2024, 0, 1, 0, 0, 0))).toEqual(false);
    });
  });
});