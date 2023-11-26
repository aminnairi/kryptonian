export interface ValidationSuccess<S extends Schema> {
  success: true,
  data: InferType<S>
}

export interface ValidationError {
  path: string,
  message: string
}

export interface ValidationErrors {
  success: false,
  errors: Array<ValidationError>
}

export type Validation<S extends Schema> = ValidationSuccess<S> | ValidationErrors

export interface Rule<Value> {
  valid: (value: Value) => boolean,
  message: string
}

export interface DateRule {
  valid: (value: Date) => boolean,
  message: string
}

export type StringRule = Rule<string>

export type NumberRule = Rule<number>

export type ArrayRule = Rule<Array<unknown>>

export type StringRules = Array<StringRule>

export type NumberRules = Array<NumberRule>

export type ArrayRules = Array<ArrayRule>

export type DateRules = Array<DateRule>

export interface StringSchema {
  type: "string",
  message: string,
  rules: StringRules
}

export interface NumberSchema {
  type: "number",
  message: string,
  rules: NumberRules
}

export interface ArraySchema<S extends Schema> {
  type: "array",
  message: string,
  schema: S,
  rules: ArrayRules
}

export type ObjectSchemaFields<S extends Schema> = Record<string, S>

export interface ObjectSchema<Fields extends ObjectSchemaFields<Schema>> {
  type: "object",
  message: string,
  fields: Fields
}

export interface AnySchema {
  type: "any"
}

export interface UnknownSchema {
  type: "unknown"
}

export interface BooleanSchema {
  type: "boolean",
  message: string
}

export interface NoneSchema {
  type: "none",
  message: string
}

export interface NotDefinedSchema {
  type: "notDefined",
  message: string
}

export interface EmptySchema {
  type: "empty",
  message: string
}

export interface DateSchema {
  type: "date",
  rules: DateRules,
  message: string
}

export interface LiteralSchema<Value> {
  type: "literal",
  message: string,
  value: Value
}

export interface OneOfSchema<S extends Schema> {
    type: "oneOf",
    schema: Array<S>
}

export type BasicSchema =
  | UnknownSchema
  | AnySchema
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NoneSchema
  | NotDefinedSchema
  | EmptySchema
  | DateSchema
  | ArraySchema<Schema>
  | ObjectSchema<ObjectSchemaFields<Schema>>
  | LiteralSchema<unknown>

export type ConstraintSchema =
  | OneOfSchema<BasicSchema>

export type Schema =
  | BasicSchema
  | ConstraintSchema

export type InferBasicType<S extends BasicSchema> =
  S extends AnySchema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? any
  : S extends UnknownSchema
  ? unknown
  : S extends NumberSchema
  ? number
  : S extends StringSchema
  ? string
  : S extends BooleanSchema
  ? boolean
  : S extends DateSchema
  ? Date
  : S extends NoneSchema
  ? null
  : S extends NotDefinedSchema
  ? undefined
  : S extends EmptySchema
  ? void
  : S extends LiteralSchema<infer InferedType>
  ? InferedType
  : S extends ArraySchema<infer InferedSchema extends Schema>
  ? Array<InferType<InferedSchema>>
  : S extends ObjectSchema<infer Fields>
  ? { [FieldKey in keyof Fields]: InferType<Fields[FieldKey]> }
  : never;

export type InferConstraintType<S extends ConstraintSchema> =
  S extends OneOfSchema<infer InferedSchema extends BasicSchema>
  ? InferBasicType<InferedSchema>
  : never

export type InferType<S extends Schema> =
  S extends BasicSchema
  ? InferBasicType<S>
  : S extends ConstraintSchema
  ? InferConstraintType<S>
  : never

export type Validator<S extends Schema> = (data: unknown) => Validation<S>

export interface StringOptions {
  /**
   * The message attached to the error
   */
  message: string,
  /**
   * A list of rules to apply to the string being validated
   */
  rules: StringRules
}

/**
 * Create a schema to validate strings
 */
export const string = ({ message, rules }: StringOptions): StringSchema => {
  return {
    type: "string",
    message,
    rules
  };
};

export interface NumberOptions {
  /**
   * The error message to attach
   */
  message: string,
  /**
   * A list of rules to apply to the number being validated
   */
  rules: NumberRules
}

/**
 * Create a schema to validate numbers
 */
export const number = ({ message, rules }: NumberOptions): NumberSchema => {
  return {
    type: "number",
    message,
    rules
  };
};

export interface ArrayOptions<S extends Schema> {
  /**
   * The schema to use for each item in the array
   */
  schema: S,
  /**
   * The message to attach to the error
   */
  message: string,
  /**
   * A list of rules to apply to the array being validated
   */
  rules: ArrayRules
}

/**
 * Create a schema to validate arrays
 */
export const array = <S extends Schema>({ schema, message, rules }: ArrayOptions<S>): ArraySchema<S> => {
  return {
    type: "array",
    schema,
    message,
    rules
  };
};

export interface ObjectOptions<S extends Schema, F extends ObjectSchemaFields<S>> {
  /**
   * The fields along with their schema
   */
  fields: F,
  /**
   * The message to attach to the error
   */
  message: string,
}

/**
 * Create a schema to validate object
 */
export const object = <S extends Schema, F extends ObjectSchemaFields<S>>({ fields, message }: ObjectOptions<S, F>): ObjectSchema<F> => {
  return {
    type: "object",
    fields,
    message,
  };
};

export interface DateOptions {
  /**
   * Message attached to the error
   */
  message: string,
  /**
   * Rules to apply to the date to validate
   */
  rules: DateRules
}

/**
 * Create a schema to validate a date
 */
export const date = ({ message, rules }: DateOptions): DateSchema => {
  return {
    type: "date",
    rules,
    message
  };
};

/**
 * Create a schema to validate data to any
 */
export const any = (): AnySchema => {
  return {
    type: "any"
  };
};

/**
 * Create a schema to validate data to unknown
 */
export const unknown = (): UnknownSchema => {
  return {
    type: "unknown"
  };
};

export interface BooleanOptions {
  /**
   * The message attached to the error
   */
  message: string
}

/**
 * Create a schema to validate boolean values
 */
export const boolean = ({ message }: BooleanOptions): BooleanSchema => {
  return {
    type: "boolean",
    message
  };
};

export interface NoneOptions {
  /**
   * The message attached to the error
   */
  message: string
}

/**
 * Create a schema to validate null values
 */
export const none = ({ message }: NoneOptions): NoneSchema => {
  return {
    type: "none",
    message
  };
};

export interface NotDefinedOptions {
  /***
   * The message attached to the error
   */
  message: string
}

/**
 * Create a schema to validate undefined values
 */
export const notDefined = ({ message }: NotDefinedOptions): NotDefinedSchema => {
  return {
    type: "notDefined",
    message
  };
};

export interface EmptyOptions {
  /**
   * The message attached to the error
   */
  message: string
}

/**
 * Create a schema to validate void values
 */
export const empty = ({ message }: EmptyOptions): EmptySchema => {
  return {
    type: "empty",
    message
  };
};

export interface LiteralOptions<Value> {
  /**
   * Message attached to the error
   */
  message: string,
  /**
   * The literal value to validate
   */
  value: Value
}

/**
 * Create a schema to validate any literal value
 */
export const literal = <Value>({ message, value }: LiteralOptions<Value>): LiteralSchema<Value> => {
  return {
    type: "literal",
    message,
    value
  };
};

/**
 * Create a schema to validate a union of values
 */
export const oneOf = <S extends Schema>(schema: Array<S>): OneOfSchema<S> => {
  return {
    type: "oneOf",
    schema: schema
  };
};

/**
 * Create a validator function to validate data
 * @param schema The schema to apply for validation
 * @param initialPath The initial path (used internally for recursivity)
 */
export const createProtector = <S extends Schema>(schema: S, initialPath: string = ""): Validator<S> => {
  return data => {
    if (schema.type === "oneOf") {
      const validations = schema.schema.map(validation => {
        const protect = createProtector(validation);
        const protection = protect(data);

        return protection;
      });

      const isValidationSuccess = (validation: Validation<S>): validation is ValidationSuccess<S> => {
        return validation.success;
      };

      const validationSuccesses = validations.filter(isValidationSuccess);

      if (validationSuccesses.length !== 0) {
        const validationSuccess = validationSuccesses[0] as ValidationSuccess<S>;

        return {
          success: true,
          data: validationSuccess.data
        };
      }

      const isValidationFailure = (validation: Validation<S>): validation is ValidationErrors => {
        return !validation.success;
      };

      const validationFailures = validations.filter(isValidationFailure);

      return {
        success: false,
        errors: validationFailures.flatMap(validation => {
          return validation.errors;
        })
      };
    }

    if (schema.type === "literal") {
      if (schema.value !== data) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "empty") {
      if (typeof data !== "undefined") {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "boolean") {
      if (typeof data !== "boolean") {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "unknown") {
      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "none") {
      if (data !== null) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "notDefined") {
      if (data !== undefined) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "any") {
      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "date") {
      const date = new Date(String(data));

      if (Number.isNaN(date.getTime())) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      const initialErrors: Array<ValidationError> = [];

      const errors = schema.rules.reduce((previousErrors, rule) => {
        if (!rule.valid(date)) {
          return [
            ...previousErrors,
            {
              path: initialPath,
              message: rule.message
            }
          ];
        }

        return previousErrors;
      }, initialErrors);

      if (errors.length !== 0) {
        return {
          success: false,
          errors
        };
      }

      return {
        success: true,
        data: date as InferType<S>
      };
    }

    if (schema.type === "number") {
      if (typeof data !== "number") {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      const initialErrors: Array<ValidationError> = [];

      const errors = schema.rules.reduce((previousErrors, rule) => {
        if (!rule.valid(data)) {
          return [
            ...previousErrors,
            {
              path: initialPath,
              message: rule.message
            }
          ];
        }

        return previousErrors;
      }, initialErrors);

      if (errors.length !== 0) {
        return {
          success: false,
          errors
        };
      }

      return {
        success: true,
        data: data as InferType<S>
      };
    }

    if (schema.type === "string") {
      if (typeof data === "string") {
        const initialErrors: Array<ValidationError> = [];

        const errors = schema.rules.reduce((previousErrors, rule) => {
          if (!rule.valid(data)) {
            return [
              ...previousErrors,
              {
                path: initialPath,
                message: rule.message
              }
            ];
          }

          return previousErrors;
        }, initialErrors);

        if (errors.length !== 0) {
          return {
            success: false,
            errors
          };
        }

        return {
          success: true,
          data: data as InferType<S>
        };
      }

      return {
        success: false,
        errors: [
          {
            path: initialPath,
            message: schema.message
          }
        ]
      };
    }

    if (schema.type === "array") {
      if (!Array.isArray(data)) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      const initialErrors: Array<ValidationError> = [];

      const errors = schema.rules.reduce((previousErrors, rule) => {
        if (!rule.valid(data)) {
          return [
            ...previousErrors,
            {
              path: initialPath,
              message: rule.message
            }
          ];
        }

        return previousErrors;
      }, initialErrors);

      if (errors.length !== 0) {
        return {
          success: false,
          errors
        };
      }

      const itemValidations = data.map((item, itemIndex) => {
        const validateArrayItem = createProtector(schema.schema, `${initialPath}[${itemIndex}]`);
        const itemValidation = validateArrayItem(item);

        return itemValidation;
      });

      const itemValidationErrors = itemValidations.flatMap(itemValidation => {
        if (itemValidation.success) {
          return null;
        }

        return itemValidation.errors;
      }).filter(itemValidation => {
        return itemValidation !== null;
      }) as Array<ValidationError>;

      const itemValidationData = itemValidations.map(itemValidation => {
        if (!itemValidation.success) {
          return null;
        }

        return itemValidation.data;
      }).filter(itemValidation => {
        return itemValidation !== null;
      }) as InferType<S>;

      if (itemValidationErrors.length !== 0) {
        return {
          success: false,
          errors: itemValidationErrors
        };
      }

      return {
        success: true,
        data: itemValidationData
      };
    }

    if (schema.type === "object") {
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        };
      }

      const validations = Object.entries(schema.fields).map(([fieldName, schema]) => {
        const validateObjectField = createProtector(schema, `${initialPath}.${fieldName}`);
        const fieldData = (data as Record<string, unknown>)[fieldName];
        const fieldValidation = validateObjectField(fieldData);

        return [
          fieldName,
          fieldValidation
        ];
      }) as Array<[string, Validation<S>]>;

      const validationErrors = validations.flatMap(([, validation]) => {
        if (validation.success) {
          return null;
        }

        return validation.errors;
      }).filter(validationErrors => {
        return validationErrors !== null;
      }) as Array<ValidationError>;

      const validationEntries = validations.map(([field, validation]) => {
        if (!validation.success) {
          return null;
        }

        return [
          field,
          validation.data
        ];
      }).filter(validationEntry => {
        return validationEntry !== null;
      }) as Array<[string, InferType<S>]>;

      const validationData = Object.fromEntries(validationEntries) as InferType<S>;

      if (validationErrors.length !== 0) {
        return {
          success: false,
          errors: validationErrors
        };
      }

      return {
        success: true,
        data: validationData
      };
    }

    return {
      success: false,
      errors: [
        {
          path: initialPath,
          message: "Unknown type"
        }
      ]
    };
  };
};

export * as Array from "./kalel/array";
export * as Number from "./kalel/number";
export * as String from "./kalel/string";
export * as Date from "./kalel/date";