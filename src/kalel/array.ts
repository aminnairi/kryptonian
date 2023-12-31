import * as Kalel from "../kalel";

/**
 * Options for the length rule function
 */
export interface LengthOptions {
  /**
   * The wanted length for the list to validate
   */
  length: number,
  /**
   * The message to attach to the error when the list does not match the target
   * length
   */
  message: string
}

/**
 * Ensure the length of a list is exactly what you want
 */
export const length = ({ length, message }: LengthOptions): Kalel.ArrayRule => {
  return {
    message,
    valid: value => value.length === length
  };
};

/**
 * Options for the lengthBetween rule function
 */
export interface LengthBetweenOptions {
  /**
   * The minimum length wanted for the list
   */
  minimum: number,
  /**
   * The maximum length wanted for the list
   */
  maximum: number,
  /**
   * The message to attach to the error when the list does not match the target
   * length
   */
  message: string
}

/**
 * Ensure that a list has a length between two given values
 */
export const lengthBetween = ({ minimum, maximum, message }: LengthBetweenOptions): Kalel.ArrayRule => {
  return {
    message,
    valid: value => value.length >= minimum && value.length <= maximum
  };
};

/**
 * Options for the minimumLength rule function
 */
export interface MinimumLengthOptions {
  /**
   * The minimum length wanted for the list
   */
  minimum: number,
  /**
   * The message to attach to the error when the list does not match the target
   * length
   */
  message: string
}

/**
 * Ensure that the length of a list is above a minimum
 */
export const minimumLength = ({ minimum, message }: MinimumLengthOptions): Kalel.ArrayRule => {
  return {
    message,
    valid: value => value.length >= minimum
  };
};

/**
 * Options for the maximumLength rule function
 */
export interface MaximumLengthOptions {
  /**
   * The maximum length wanted for the list
   */
  maximum: number,
  /**
   * The message to attach to the error when the list does not match the target
   * length
   */
  message: string
}

/**
 * Ensure that the length of a list is below a maximum
 */
export const maximumLength = ({ maximum, message }: MaximumLengthOptions): Kalel.ArrayRule => {
  return {
    message,
    valid: value => value.length <= maximum
  };
};

/**
 * Options for the nonEmpty rule function
 */
export interface NonEmptyOptions {
  // The message to attach to the error when the list is empty
  message: string
}

/**
 * Ensure that an array is not empty
 */
export const nonEmpty = ({ message }: NonEmptyOptions): Kalel.ArrayRule => {
  return {
    message,
    valid: value => value.length !== 0
  };
};
