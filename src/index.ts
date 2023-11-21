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

export type TextRule = Rule<string>

export type NumericRule = Rule<number>

export type ListRule = Rule<Array<unknown>>

export type RecordRule = Rule<object>

export type TextRules = Array<TextRule>

export type NumericRules = Array<NumericRule>

export type ListRules = Array<ListRule>

export type RecordRules = Array<RecordRule>

export type DateRules = Array<DateRule>

export interface TextSchema {
  type: "text",
  message: string,
  rules: TextRules
}

export interface NumericSchema {
  type: "numeric",
  message: string,
  rules: NumericRules
}

export interface ListSchema<S extends Schema> {
  type: "list",
  message: string,
  schema: S,
  rules: ListRules
}

type RecordSchemaFields<S extends Schema> = Record<string, S>

export interface RecordSchema<Fields extends RecordSchemaFields<Schema>> {
  type: "record",
  message: string,
  fields: Fields,
  rules: RecordRules
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

export type Schema =
  | UnknownSchema
  | AnySchema
  | TextSchema
  | NumericSchema
  | BooleanSchema
  | NoneSchema
  | NotDefinedSchema
  | EmptySchema
  | DateSchema
  | ListSchema<Schema>
  | RecordSchema<RecordSchemaFields<Schema>>
  | LiteralSchema<any>

export type InferType<S extends Schema> =
  S extends AnySchema
  ? any
  : S extends UnknownSchema
  ? unknown
  : S extends NumericSchema
  ? number
  : S extends TextSchema
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
  : S extends ListSchema<infer AS>
  ? Array<InferType<AS>>
  : S extends RecordSchema<infer Fields>
  ? { [FieldKey in keyof Fields]: InferType<Fields[FieldKey]> }
  : never

type Validator<S extends Schema> = (data: unknown) => Validation<S>

export interface TextOptions {
  /**
   * The message attached to the error
   */
  message: string,
  /**
   * A list of rules to apply to the string being validated
   */
  rules: TextRules
}

/**
 * Create a schema to validate strings
 */
export const text = ({ message, rules }: TextOptions): TextSchema => {
  return {
    type: "text",
    message,
    rules
  }
}

export interface NumberOptions {
  /**
   * The error message to attach
   */
  message: string,
  /**
   * A list of rules to apply to the number being validated
   */
  rules: NumericRules
}

/**
 * Create a schema to validate numbers
 */
export const numeric = ({ message, rules }: NumberOptions): NumericSchema => {
  return {
    type: "numeric",
    message,
    rules
  };
};

export interface ListOptions<S extends Schema> {
  /**
   * The schema to use for each item in the list
   */
  schema: S,
  /**
   * The message to attach to the error
   */
  message: string,
  /**
   * A list of rules to apply to the array being validated
   */
  rules: ListRules
}

/**
 * Create a schema to validate arrays
 */
export const list = <S extends Schema>({ schema, message, rules }: ListOptions<S>): ListSchema<S> => {
  return {
    type: "list",
    schema,
    message,
    rules
  }
}

export interface RecordOptions<S extends Schema, F extends RecordSchemaFields<S>> {
  /**
   * The fields along with their schema
   */
  fields: F,
  /**
   * The message to attach to the error
   */
  message: string,
  /**
   * A list of rules to apply the object being validated
   */
  rules: RecordRules
}

/**
 * Create a schema to validate object
 */
export const record = <S extends Schema, F extends RecordSchemaFields<S>>({ fields, message, rules }: RecordOptions<S, F>): RecordSchema<F> => {
  return {
    type: "record",
    fields,
    message,
    rules
  }
}

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
  }
};

/**
 * Create a schema to validate data to any
 */
export const any = (): AnySchema => {
  return {
    type: "any"
  };
}

/**
 * Create a schema to validate data to unknown
 */
export const unknown = (): UnknownSchema => {
  return {
    type: "unknown"
  };
}

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
  }
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
}

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
  }
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
}

/**
 * Create a validator function to validate data
 * @param schema The schema to apply for validation
 * @param initialPath The initial path (used internally for recursivity)
 */
export const createProtector = <S extends Schema>(schema: S, initialPath: string = ""): Validator<S> => {
  return data => {
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
      }
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
          ]
        }

        return previousErrors
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

    if (schema.type === "numeric") {
      if (typeof data !== "number") {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        }
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
          ]
        }

        return previousErrors
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
      }
    }

    if (schema.type === "text") {
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
            ]
          }

          return previousErrors
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
        }
      }

      return {
        success: false,
        errors: [
          {
            path: initialPath,
            message: schema.message
          }
        ]
      }
    }

    if (schema.type === "list") {
      if (!Array.isArray(data)) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        }
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
          ]
        }

        return previousErrors
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
        }
      }

      return {
        success: true,
        data: itemValidationData
      }
    }

    if (schema.type === "record") {
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return {
          success: false,
          errors: [
            {
              path: initialPath,
              message: schema.message
            }
          ]
        }
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
          ]
        }

        return previousErrors
      }, initialErrors);

      if (errors.length !== 0) {
        return {
          success: false,
          errors
        };
      }

      const validations = Object.entries(schema.fields).map(([fieldName, schema]) => {
        const validateRecordField = createProtector(schema, `${initialPath}.${fieldName}`);
        const fieldData = (data as Record<string, unknown>)[fieldName];
        const fieldValidation = validateRecordField(fieldData);

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
        return validationErrors !== null
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
          path: "",
          message: "Unknown type"
        }
      ]
    }
  };
};

export * as List from "./list";
export * as Numeric from "./numeric"
export * as Text from "./text";
export * as Jorel from "./jorel";
export * as Date from "./date";