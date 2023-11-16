import { ListRule } from ".";

export const length = ({ length, message }: { length: number, message: string }): ListRule => {
  return {
    message,
    valid: value => value.length === length
  };
};