import { ListRule } from ".";

export const length = ({ length, message }: { length: number, message: string }): ListRule => {
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
