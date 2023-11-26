import { describe, test, expect } from "vitest";
import { between, divisibleBy, notDivisibleBy, even, odd, positive, negative, integer } from "./number";

describe("number", () => {
  describe("between", () => {
    test("It should return a rule", () => {
      const rule = between({
        minimum: 2,
        maximum: 5,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(6)).toEqual(false);
    });
  });

  describe("divisibleBy", () => {
    test("It should return a rule", () => {
      const rule = divisibleBy({
        divisor: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(5)).toEqual(false);
    });
  });

  describe("notDivisibleBy", () => {
    test("It should return a rule", () => {
      const rule = notDivisibleBy({
        divisor: 2,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(5)).toEqual(true);
      expect(rule.valid(6)).toEqual(false);
    });
  });

  describe("even", () => {
    test("It should return a rule", () => {
      const rule = even({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(5)).toEqual(false);
    });
  });

  describe("odd", () => {
    test("It should return a rule", () => {
      const rule = odd({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(5)).toEqual(true);
      expect(rule.valid(2)).toEqual(false);
    });
  });

  describe("positive", () => {
    test("It should return a rule", () => {
      const rule = positive({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(-5)).toEqual(false);
    });
  });

  describe("negative", () => {
    test("It should return a rule", () => {
      const rule = negative({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(-2)).toEqual(true);
      expect(rule.valid(5)).toEqual(false);
    });
  });

  describe("integer", () => {
    test("It should return a rule", () => {
      const rule = integer({
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(5.4)).toEqual(false);
    });
  });

  describe("greater", () => {
    test("It should return a rule", () => {
      const rule = greater({
        number: 5,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(10)).toEqual(true);
      expect(rule.valid(2)).toEqual(false);
    });
  });

  describe("lower", () => {
    test("It should return a rule", () => {
      const rule = lower({
        number: 5,
        message: "Message"
      });

      expect(rule.message).toEqual("Message");
      expect(rule.valid(2)).toEqual(true);
      expect(rule.valid(7)).toEqual(false);
    });
  });

});