import { describe, test, expect } from "vitest";
import { any, array, boolean, date, empty, literal, none, notDefined, numeric, object, oneOf, text, unknown } from "./kalel";

describe("kalel", () => {
  describe("text", () => {
    test("should return true", () => {
      const schema = text({
        message: "Message",
        rules: []
      });

      expect(schema).toEqual({
        type: "text",
        message: "Message",
        rules: []
      });
    });
  });

  describe("number", () => {
    test("should return true", () => {
      const schema = numeric({
        message: "Message",
        rules: []
      });

      expect(schema).toEqual({
        type: "numeric",
        message: "Message",
        rules: []
      });
    });

  });

  describe("boolean", () => {
    test("should return true", () => {
      const schema = boolean({
        message: "Message"
      });

      expect(schema).toEqual({
        type: "boolean",
        message: "Message"
      });
    });
  });

  describe("date", () => {
    test("should return true", () => {
      const schema = date({
        message: "Message",
        rules: []
      });

      expect(schema).toEqual({
        type: "date",
        message: "Message",
        rules: []
      });
    });
  });

  describe("any", () => {
    test("should return true", () => {
      const schema = any();

      expect(schema).toEqual({
        type: "any"
      });
    });
  });

  describe("none", () => {
    test("should return true", () => {
      const schema = none({
        message: "Message"
      });

      expect(schema).toEqual({
        type: "none",
        message: "Message"
      });
    });
  });

  describe("unknown", () => {
    test("should return true", () => {
      const schema = unknown();

      expect(schema).toEqual({
        type: "unknown",
      });
    });
  });

  describe("notDefined", () => {
    test("should return true", () => {
      const schema = notDefined({
        message: "Message"
      });

      expect(schema).toEqual({
        type: "notDefined",
        message: "Message"
      });
    });
  });

  describe("empty", () => {
    test("should return true", () => {
      const schema = empty({
        message: "Message"
      });

      expect(schema).toEqual({
        type: "empty",
        message: "Message"
      });
    });
  });

  describe("literal", () => {
    test("should return true", () => {
      const schema = literal({
        value: true as const,
        message: "Message"
      });

      expect(schema).toEqual({
        type: "literal",
        value: true as const,
        message: "Message"
      });
    });
  });

  describe("oneOf", () => {
    test("should return true", () => {
      const schema = oneOf([
        text({
          message: "Message",
          rules: []
        }),
        boolean({
          message: "Message"
        })
      ]);

      expect(schema).toEqual({
        type: "oneOf",
        schema: [
          {
            type: "text",
            message: "Message",
            rules: []
          },
          {
            type: "boolean",
            message: "Message"
          }
        ]
      });
    });
  });

  describe("array", () => {
    test("should return true", () => {
      const schema = array({
        message: "Message",
        rules: [],
        schema: text({
          message: "Message",
          rules: []
        })
      });

      expect(schema).toEqual({
        type: "array",
        message: "Message",
        rules: [],
        schema: {
          type: "text",
          message: "Message",
          rules: []
        }
      });
    });
  });

  describe("object", () => {
    test("should return true", () => {
      const schema = object({
        message: "Message",
        fields: {
          field: text({
            message: "Message",
            rules: []
          })
        }
      });

      expect(schema).toEqual({
        type: "object",
        message: "Message",
        fields: {
          field: {
            type: "text",
            message: "Message",
            rules: []
          }
        }
      });
    });
  });
});