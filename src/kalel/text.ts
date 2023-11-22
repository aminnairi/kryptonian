import * as Kalel from "../kalel";

export interface LengthOptions {
  /**
   * The length that the string should equal
   */
  length: number,
  /**
   * The message attached to the error when the string is not exactly of the
   * length provided
   */
  message: string
}

/**
 * Ensure that a string has an exact length
 */
export const length = ({ length, message }: LengthOptions): Kalel.TextRule => {
  return {
    message,
    valid: value => value.length === length
  }
}

export interface MinimumLengthOptions {
  /**
   * The minimum length that the string should equal to
   */
  minimum: number,
  /**
   * The messag attached to the error when the string is not at least of the provided length
   */
  message: string
}

/**
 * Ensure that a string has a minimum length
 */
export const minimumLength = ({ minimum, message }: MinimumLengthOptions): Kalel.TextRule => {
  return {
    message,
    valid: value => value.length >= minimum
  }
}

export interface EmailOptions {
  /**
   * The message attached to the error when the string is not a valid email
   */
  message: string
}

/**
 * Ensure that a string is a valid email
 */
export const email = ({ message}: EmailOptions): Kalel.TextRule => {
  return {
    message,
    valid: value => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(value)
  };
}