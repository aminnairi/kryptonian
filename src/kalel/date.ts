import * as Kalel from "../kalel";

/**
 * Optionsf or the between rule function
 */
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
export const between = ({ minimum, maximum, message }: BetweenOptions): Kalel.DateRule => {
  return {
    valid: date => {
      const dateTime = date.getTime();
      const minimumTime = minimum.getTime();
      const maximumTime = maximum.getTime();

      return dateTime >= minimumTime && dateTime <= maximumTime;
    },
    message
  };
}; 

/**
 * Options for the before rule function
 */
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
export const before = ({ date, message }: BeforeOptions): Kalel.DateRule => {
  return {
    valid: dateToValidate => {
      const dateToValidateTime = dateToValidate.getTime();
      const dateTime = date.getTime();

      return dateToValidateTime < dateTime;
    },
    message
  };
};

/**
 * Options for the after rule function
 */
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
export const after = ({ date, message }: AfterOptions): Kalel.DateRule => {
  return {
    valid: dateToValidate => {
      const dateToValidateTime = dateToValidate.getTime();
      const dateTime = date.getTime();

      return dateToValidateTime > dateTime;
    },
    message
  };
};
