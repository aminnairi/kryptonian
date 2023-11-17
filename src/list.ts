import { ListRule } from ".";

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
export const length = ({ length, message }: LengthOptions): ListRule => {
  return {
    message,
    valid: value => value.length === length
  };
};

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
export const lengthBetween = ({ minimum, maximum, message }: LengthBetweenOptions): ListRule => {
  return {
    message,
    valid: value => value.length >= minimum && value.length <= maximum
  };
};

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
export const minimumLength = ({ minimum, message }: MinimumLengthOptions): ListRule => {
  return {
    message,
    valid: value => value.length >= minimum
  };
};

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
export const maximumLength = ({ maximum, message }: MaximumLengthOptions): ListRule => {
  return {
    message,
    valid: value => value.length <= maximum
  };
};
