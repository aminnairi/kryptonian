import * as Kalel from "../kalel";

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

};