import { NumericRule } from ".";

export const between = ({ minimum, maximum, message }: { minimum: number, maximum: number, message: string }): NumericRule => {
  return {
    message,
    valid: value => value >= minimum && value <= maximum
  };
};