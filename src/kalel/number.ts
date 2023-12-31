import * as Kalel from "../kalel";

/**
 * Options for the between rule function
 */
export interface BetweenOptions {
  /**
   * The wanted minimum value for the number
   */
  minimum: number,
  /**
   * The wanted maximum value for the number
   */
  maximum: number,
  /**
   * The message attached to the error when the number is not between the
   * minimum & maximum values
   */
  message: string
}

/**
 * Ensure that a number is between a range of values
 */
export const between = ({ minimum, maximum, message }: BetweenOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => value >= minimum && value <= maximum
  };
};

/**
 * Options for the divisibleBy rule function
 */
export interface DivisibleByOptions {
  /**
   * A number that, when used for dividing the number, should return an integer
   * division result
   */
  divisor: number,
  /**
   * The message attached to the error when the number is not divisible by the
   * provided value
   */
  message: string
}

/**
 * Ensure that a number is can be divided without remaining value by another
 */
export const divisibleBy = ({ divisor, message }: DivisibleByOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value % divisor === 0
  };
};

/**
 * Options for the notDivisibleBy rule function
 */
export interface NotDivisibleByOptions {
  /**
   * A number that, when used for dividing the number, should not return an integer
   * division result
   */
  divisor: number,
  /**
   * The message attached to the error when the number is divisible by the
   * provided value
   */
  message: string
}

/**
 * Ensure that a number is cannot be divided without remaining value by another
 */
export const notDivisibleBy = ({ divisor, message }: NotDivisibleByOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value % divisor !== 0
  };
};

/**
 * Options for the even rule function
 */
export interface EvenOptions {
  /**
   * The message attached to the error when the number is not even
   */
  message: string
}

/**
 * Ensure that a number is even
 */
export const even = ({ message }: EvenOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value % 2 === 0
  };
};

/**
 * Options for the odd rule function
 */
export interface OddOptions {
  /**
   * The message attached to the error when the number is not odd
   */
  message: string
}

/**
 * Ensure that a number is odd
 */
export const odd = ({ message }: OddOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value % 2 !== 0
  };
};

/**
 * Options for the positive rule function
 */
export interface PositiveOptions {
  /**
   * The message attached to the error when the number is not positive
   */
  message: string
}

/**
 * Ensure that a number is positive
 */
export const positive = ({ message }: PositiveOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value > 0
  };
};

/**
 * Options for the negative rule function
 */
export interface NegativeOptions {
  /**
   * The message attached to the error when the number is not positive
   */
  message: string
}

/**
 * Ensure that a number is negative
 */
export const negative = ({ message }: NegativeOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => value < 0
  };
};

/**
 * Options for the integer rule function
 */
export interface IntegerOptions {
  /**
   * The message attached to the error when the number is not positive
   */
  message: string
}

/**
 * Ensure that a number is integer
 */
export const integer = ({ message }: IntegerOptions): Kalel.NumberRule => {
  return {
    message,
    valid: (value: number) => Number.isInteger(value)
  };
};

/**
 * Options for the greater rule function
 */
export interface GreaterOptions {
  /**
   * Message to attach to the error when the number is not greater than another
   * one
   */
  message: string,
  /**
   * The number that the value must be greater than
   */
  number: number
}

/**
 * Ensure that a number is greater than another one
 */
export const greater = ({ message, number }: GreaterOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => value > number
  };
};

/**
 * Options for the lower rule function
 */
export interface LowerOptions {
  /**
   * Message to attach to the error when the number is not greater than another
   * one
   */
  message: string,
  /**
   * The number that the value must be lower than
   */
  number: number
}

/**
 * Ensure that a number is lower than another one
 */
export const lower = ({ message, number }: LowerOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => value < number
  };
};

/**
 * Options for the greaterOrEqual rule function
 */
export interface GreaterOrEqualOptions {
  /**
   * Message to attach to the error when the number is not greater or equal to another
   * one
   */
  message: string,
  /**
   * The number that the value must be greater or equal to
   */
  number: number
}

/**
 * Ensure that a number is lower than another one
 */
export const greaterOrEqual = ({ message, number }: GreaterOrEqualOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => value >= number
  };
};

/**
 * Options for the lowerOrEqual function
 */
export interface LowerOrEqualOptions {
  /**
   * Message to attach to the error when the number is not lower or equal to another
   * one
   */
  message: string,
  /**
   * The number that the value must be lower or equal to
   */
  number: number
}

/**
 * Ensure that a number is lower or equal to another one
 */
export const lowerOrEqual = ({ message, number }: LowerOrEqualOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => value <= number
  };
};

/**
 * Options for the finite rule function
 */
export interface FiniteOptions {
  /**
   * Message to attach to the error when the number is not finite one
   */
  message: string
}

/**
 * Ensure that a number is finite
 */
export const finite = ({ message }: FiniteOptions): Kalel.NumberRule => {
  return {
    message,
    valid: value => Number.isFinite(value)
  };
};
