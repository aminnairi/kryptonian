import { DateRule } from "."

export interface BetweenOptions {
  /**
   * Minimum date possible
   */
  minimum: Date,
  /**
   * Maximum date possible
   */
  maximum: Date,
  /**
   * Message to attach to the error
   */
  message: string
}

/**
 * Ensure that a date is between a minimum and maximum
 */
export const between = ({ minimum, maximum, message }: BetweenOptions): DateRule => {
  return {
    valid: date => {
      const dateTime = date.getTime();
      const minimumTime = minimum.getTime();
      const maximumTime = maximum.getTime();

      return dateTime >= minimumTime && dateTime <= maximumTime;
    },
    message
  }
} 

export interface BeforeOptions {
  /**
   * Date to compare
   */
  date: Date,
  /**
   * Message attached to the error
   */
  message: string
}

/**
 * Ensure that a date is before another
 */
export const before = ({ date, message }: BeforeOptions): DateRule => {
  return {
    valid: dateToValidate => {
      const dateToValidateTime = dateToValidate.getTime();
      const dateTime = date.getTime();

      return dateToValidateTime < dateTime;
    },
    message
  };
}

export interface AfterOptions {
  /**
   * Date to compare
   */
  date: Date,
  /**
   * Message attached to the error
   */
  message: string
}

/**
 * Ensure that a date is before another
 */
export const after = ({ date, message }: AfterOptions): DateRule => {
  return {
    valid: dateToValidate => {
      const dateToValidateTime = dateToValidate.getTime();
      const dateTime = date.getTime();

      return dateToValidateTime > dateTime;
    },
    message
  };
}