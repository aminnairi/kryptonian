import { ListRule } from ".";

export interface ListLengthRuleOptions {
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
export const length = ({ length, message }: ListLengthRuleOptions): ListRule => {
  return {
    message,
    valid: value => value.length === length
  };
};

export const lengthBetween = ({ minimum, maximum, message }: { minimum: number, maximum: number, message: string }): ListRule => {
  return {
    message,
    valid: value => value.length >= minimum && value.length <= maximum
  };
};

export const minimumLength = ({ minimum, message }: { minimum: number, message: string }): ListRule => {
  return {
    message,
    valid: value => value.length >= minimum
  };
};

export const maximumLength = ({ maximum, message }: { maximum: number, message: string }): ListRule => {
  return {
    message,
    valid: value => value.length <= maximum
  };
};
