import { describe, test, expect } from "vitest";
import { any, array, boolean, createProtector, date, empty, literal, none, notDefined, numeric, object, oneOf, text, unknown } from "./kalel";
import { between } from "./kalel/date";
import * as KalelNumeric from "./kalel/numeric";
import * as KalelText from "./kalel/text";
import * as KalelArray from "./kalel/array";

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

  describe("createProtector", () => {
    describe("any", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(any());
        const protection = protect(123);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(123);
      });
    });

    describe("oneOf", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(oneOf([
          text({
            message: "text",
            rules: []
          }),
          boolean({
            message: "boolean"
          })
        ]));

        const protection = protect("Hello");

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual("Hello");
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(oneOf([
          text({
            message: "text",
            rules: []
          }),
          boolean({
            message: "boolean"
          })
        ]));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "text"
          },
          {
            path: "",
            message: "boolean"
          }
        ]);
      });
    });

    describe("oneOf", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(oneOf([
          text({
            message: "text",
            rules: []
          }),
          boolean({
            message: "boolean"
          })
        ]));

        const protection = protect("Hello");

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual("Hello");
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(oneOf([
          text({
            message: "text",
            rules: []
          }),
          boolean({
            message: "boolean"
          })
        ]));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "text"
          },
          {
            path: "",
            message: "boolean"
          }
        ]);
      });
    });

    describe("literal", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(literal({
          message: "literal",
          value: 123 as const
        }));

        const protection = protect(123);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(123);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(literal({
          message: "literal",
          value: 123
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "literal"
          },
        ]);
      });
    });

    describe("empty", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(empty({
          message: "empty"
        }));

        const protection = protect(undefined);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(undefined);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(empty({
          message: "empty"
        }));

        const protection = protect(123);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "empty"
          },
        ]);
      });
    });

    describe("boolean", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(boolean({
          message: "boolean"
        }));

        const protection = protect(true);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(true);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(boolean({
          message: "boolean"
        }));

        const protection = protect(123);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "boolean"
          },
        ]);
      });
    });

    describe("unknown", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(unknown());

        const protection = protect(true);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(true);
      });
    });

    describe("none", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(none({
          message: "none"
        }));

        const protection = protect(null);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(null);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(none({
          message: "none"
        }));

        const protection = protect(123);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "none"
          },
        ]);
      });
    });

    describe("notDefined", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(notDefined({
          message: "notDefined"
        }));

        const protection = protect(undefined);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(undefined);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(notDefined({
          message: "notDefined"
        }));

        const protection = protect(123);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "notDefined"
          },
        ]);
      });
    });

    describe("date", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(date({
          message: "date",
          rules: []
        }));

        const protection = protect(new Date(2023, 0, 1, 0, 0, 0));

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(new Date(2023, 0, 1, 0, 0, 0));
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(date({
          message: "date",
          rules: []
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "date"
          },
        ]);
      });

      test("It should return a success validation with rules", () => {
        const protect = createProtector(date({
          message: "date",
          rules: [
            between({
              minimum: new Date(2023, 0, 1, 0, 0, 0),
              maximum: new Date(2025, 0, 1, 0, 0, 0),
              message: "between"
            })
          ]
        }));

        const protection = protect(new Date(2024, 0, 1, 0, 0, 0));

        if (!protection.success) {
          throw new Error(JSON.stringify(protection.errors, null, 2));
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(new Date(2024, 0, 1, 0, 0, 0));
      });

      test("It should return a failed validation with rules", () => {
        const protect = createProtector(date({
          message: "date",
          rules: [
            between({
              minimum: new Date(2023, 0, 1, 0, 0, 0),
              maximum: new Date(2025, 0, 1, 0, 0, 0),
              message: "between"
            })
          ]
        }));

        const protection = protect(new Date(2020, 0, 1, 0, 0, 0));

        if (protection.success) {
          throw new Error("Unexpected success validation");
        }

        expect(protection.success).toEqual(false);
        expect(protection.errors).toEqual([
          {
            path: "",
            message: "between"
          }
        ]);
      });
    });

    describe("numeric", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(numeric({
          message: "numeric",
          rules: []
        }));

        const protection = protect(123);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(123);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(numeric({
          message: "numeric",
          rules: []
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "numeric"
          },
        ]);
      });

      test("It should return a success validation with rules", () => {
        const protect = createProtector(numeric({
          message: "numeric",
          rules: [
            KalelNumeric.between({
              minimum: 10,
              maximum: 20,
              message: "between"
            })
          ]
        }));

        const protection = protect(15);

        if (!protection.success) {
          throw new Error(JSON.stringify(protection.errors, null, 2));
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(15);
      });

      test("It should return a failed validation with rules", () => {
        const protect = createProtector(numeric({
          message: "date",
          rules: [
            KalelNumeric.between({
              minimum: 10,
              maximum: 20,
              message: "between"
            })
          ]
        }));

        const protection = protect(25);

        if (protection.success) {
          throw new Error("Unexpected success validation");
        }

        expect(protection.success).toEqual(false);
        expect(protection.errors).toEqual([
          {
            path: "",
            message: "between"
          }
        ]);
      });
    });

    describe("text", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(text({
          message: "text",
          rules: []
        }));

        const protection = protect("Hello");

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual("Hello");
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(text({
          message: "text",
          rules: []
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "text"
          },
        ]);
      });

      test("It should return a success validation with rules", () => {
        const protect = createProtector(text({
          message: "text",
          rules: [
            KalelText.length({
              length: 2,
              message: "length"
            })
          ]
        }));

        const protection = protect("Hi");

        if (!protection.success) {
          throw new Error(JSON.stringify(protection.errors, null, 2));
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual("Hi");
      });

      test("It should return a failed validation with rules", () => {
        const protect = createProtector(text({
          message: "date",
          rules: [
            KalelText.length({
              length: 2,
              message: "length"
            })
          ]
        }));

        const protection = protect("Mom");

        if (protection.success) {
          throw new Error("Unexpected success validation");
        }

        expect(protection.success).toEqual(false);
        expect(protection.errors).toEqual([
          {
            path: "",
            message: "length"
          }
        ]);
      });
    });

    describe("array", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(array({
          message: "array",
          rules: [],
          schema: text({
            message: "text",
            rules: []
          })
        }));

        const protection = protect(["Hello"]);

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(["Hello"]);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(array({
          message: "array",
          rules: [],
          schema: text({
            message: "text",
            rules: []
          })
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "array"
          },
        ]);
      });

      test("It should return a failed validation again", () => {
        const protect = createProtector(array({
          message: "array",
          rules: [],
          schema: text({
            message: "text",
            rules: []
          })
        }));

        const protection = protect([123]);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "[0]",
            message: "text"
          },
        ]);
      });

      test("It should return a success validation with rules", () => {
        const protect = createProtector(array({
          message: "array",
          schema: text({
            message: "text",
            rules: []
          }),
          rules: [
            KalelArray.length({
              length: 2,
              message: "length"
            })
          ]
        }));

        const protection = protect(["Hi", "Mom"]);

        if (!protection.success) {
          throw new Error(JSON.stringify(protection.errors, null, 2));
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual(["Hi", "Mom"]);
      });

      test("It should return a failed validation with rules", () => {
        const protect = createProtector(array({
          message: "array",
          schema: text({
            message: "",
            rules: []
          }),
          rules: [
            KalelArray.length({
              length: 2,
              message: "length"
            })
          ]
        }));

        const protection = protect(["Hi", "Mom", "!"]);

        if (protection.success) {
          throw new Error("Unexpected success validation");
        }

        expect(protection.success).toEqual(false);
        expect(protection.errors).toEqual([
          {
            path: "",
            message: "length"
          }
        ]);
      });
    });

    describe("object", () => {
      test("It should return a successful validation", () => {
        const protect = createProtector(object({
          message: "object",
          fields: {
            field: text({
              message: "text",
              rules: []
            })
          }
        }));

        const protection = protect({ field: "Hi" });

        if (!protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(true);
        expect(protection.data).toEqual({ field: "Hi" });
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(object({
          message: "object",
          fields: {
            field: text({
              message: "text",
              rules: []
            })
          }
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "object"
          },
        ]);
      });

      test("It should return a failed validation again", () => {
        const protect = createProtector(object({
          message: "object",
          fields: {
            field: text({
              message: "text",
              rules: []
            })
          }
        }));

        const protection = protect({ property: "Hi" });

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: ".field",
            message: "text"
          },
        ]);
      });
    });

    describe("unhandled", () => {
      test("It should return a failed validation", () => {
        const protect = createProtector({
          // @ts-expect-error
          type: "unhandled"
        });

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Unexpected successful protection");
        }

        expect(protection.success).toEqual(false);
        expect(protection.errors).toEqual([
          {
            path: "",
            message: "Unknown type"
          }
        ]);
      });

      test("It should return a failed validation", () => {
        const protect = createProtector(object({
          message: "object",
          fields: {
            field: text({
              message: "text",
              rules: []
            })
          }
        }));

        const protection = protect(null);

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: "",
            message: "object"
          },
        ]);
      });

      test("It should return a failed validation again", () => {
        const protect = createProtector(object({
          message: "object",
          fields: {
            field: text({
              message: "text",
              rules: []
            })
          }
        }));

        const protection = protect({ property: "Hi" });

        if (protection.success) {
          throw new Error("Protection failure");
        }

        expect(protection.success).toEqual(false);

        expect(protection.errors).toEqual([
          {
            path: ".field",
            message: "text"
          },
        ]);
      });
    });
  });
});