import { NumericRule } from ".";

export const between = ({ minimum, maximum, message }: { minimum: number, maximum: number, message: string }): NumericRule => {
  return {
    message,
    valid: value => value >= minimum && value <= maximum
  };
};

export const divisibleBy = ({ divisor, message }: { divisor: number, message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value % divisor === 0
  };
};

export const notDivisibleBy = ({ divisor, message }: { divisor: number, message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value % divisor !== 0
  };
};

export const even = ({ message }: { message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value % 2 === 0
  };
};
export const odd = ({ message }: { message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value % 2 !== 0
  };
};

export const positive = ({ message }: { message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value > 0
  };
};

export const negative = ({ message }: { message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => value < 0
  };
};

export const integer = ({ message }: { message: string }): NumericRule => {
  return {
    message,
    valid: (value: number) => Number.isInteger(value)
  };
};