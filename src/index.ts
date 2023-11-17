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

export type TextRule = Rule<string>

export type NumericRule = Rule<number>

export type ListRule = Rule<Array<unknown>>

export type RecordRule = Rule<object>

export type TextRules = Array<TextRule>

export type NumericRules = Array<NumericRule>

export type ListRules = Array<ListRule>

export type RecordRules = Array<RecordRule>

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

export type Schema = TextSchema | NumericSchema | ListSchema<Schema> | RecordSchema<RecordSchemaFields<Schema>>;

export type InferType<S extends Schema> =
  S extends NumericSchema
  ? number
  : S extends TextSchema
  ? string
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

/**
 * Create a validator function to validate data
 * @param schema The schema to apply for validation
 * @param initialPath The initial path (used internally for recursivity)
 */
export const createProtector = <S extends Schema>(schema: S, initialPath: string = ""): Validator<S> => {
  return data => {
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

      const initialItemErrors: Array<ValidationError> = [];

      const itemErrors = data.reduce((previousItemErrors, item, itemIndex) => {
        const validateArrayItem = createProtector(schema.schema, `${initialPath}[${itemIndex}]`);
        const itemValidation = validateArrayItem(item);

        if (!itemValidation.success) {
          return [
            ...previousItemErrors,
            ...itemValidation.errors
          ];
        }

        return previousItemErrors;
      }, initialItemErrors) as Array<ValidationError>;

      if (itemErrors.length !== 0) {
        return {
          success: false,
          errors: itemErrors
        }
      }

      return {
        success: true,
        data: data as InferType<S>
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

      const initialPropertyErrors: Array<ValidationError> = [];

      const propertyErrors = Object.keys(schema.fields).reduce((previousPropertyErrors, field) => {
        const fieldSchema = schema.fields[field];

        if (fieldSchema === undefined) {
          return previousPropertyErrors;
        }

        const validateRecordField = createProtector(fieldSchema, `${initialPath}.${field}`);
        const fieldData = (data as Record<string, unknown>)[field];
        const fieldValidation = validateRecordField(fieldData);

        if (!fieldValidation.success) {
          return [
            ...previousPropertyErrors,
            ...fieldValidation.errors
          ];
        }

        return previousPropertyErrors;
      }, initialPropertyErrors) as Array<ValidationError>;

      if (propertyErrors.length !== 0) {
        return {
          success: false,
          errors: propertyErrors
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