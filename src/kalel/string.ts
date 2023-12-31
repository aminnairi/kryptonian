import * as Kalel from "../kalel";

/**
 * Options for the length rule function
 */
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
export const length = ({ length, message }: LengthOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => value.length === length
  };
};

/**
 * Options for the minimumLength rule function
 */
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
export const minimumLength = ({ minimum, message }: MinimumLengthOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => value.length >= minimum
  };
};

/**
 * Options for the email rule function
 */
export interface EmailOptions {
  /**
   * The message attached to the error when the string is not a valid email
   */
  message: string
}

/**
 * Ensure that a string is a valid email
 */
export const email = ({ message}: EmailOptions): Kalel.StringRule => {
  return {
    message,
    // eslint-disable-next-line no-control-regex
    valid: value => /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(value)
  };
};

/**
 * Options for the includes rule function
 */
export interface IncludesOptions {
  /**
   * The message to attach to the error when the string does not include another
   */
  message: string,
  /**
   * The string that should be included
   */
  string: string
}

/**
 * Ensure that a string includes another one
 */
export const includes = ({ message, string }: IncludesOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => value.includes(string)
  };
};

/**
 * Options for the startsWith rule function
 */
export interface StartsWithOptions {
  /**
   * The message to attach to the error when the string does not starts with another
   */
  message: string,
  /**
   * The string that should be the beginning
   */
  string: string
}

/**
 * Ensure that a string starts with another one
 */
export const startsWith = ({ message, string }: StartsWithOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => value.startsWith(string)
  };
};

/**
 * Options for the endsWith rule function
 */
export interface EndsWithOptions {
  /**
   * The message to attach to the error when the string does not ends with another
   */
  message: string,
  /**
   * The string that should be the end
   */
  string: string
}

/**
 * Ensure that a string ends with another one
 */
export const endsWith = ({ message, string }: EndsWithOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => value.endsWith(string)
  };
};

/**
 * Optionsf or the internetProtocolVersion4 rule function
 */
export interface InternetProtocolVersion4Options {
  /**
   * The message to attach to the error if the string is not in the Internet Protocol version 4 format
   */
  message: string
}

/**
 * Ensure that a string is in the Internet Protocol version 4 format
 */
export const internetProtocolVersion4 = ({ message }: InternetProtocolVersion4Options): Kalel.StringRule => {
  return {
    message,
    valid: value => /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/.test(value)
  };
};

/**
 * Options for the internetProtocolVersion4WithClassesInterDomainRouting rule function
 */
export interface InternetProtocolVersion4WithClasslessInterDomainRoutingOptions {
  /**
   * The message to attach to the error if the string is not in the Internet Protocol version 4 with classless inter-domain routing format
   */
  message: string
}

/**
 * Ensure that a string is in the Internet Protocol version 4 with classless inter-domain routing format
 */
export const internetProtocolVersion4WithClassesInterDomainRouting = ({ message }: InternetProtocolVersion4Options): Kalel.StringRule => {
  return {
    message,
    valid: value => /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}\/([0-9]|[1-2][0-9]|3[0-2])$/.test(value)
  };
};

/**
 * Options for the uniformResourceLocator rule function
 */
export interface UniformResourceLocatorOptions {
  /**
   * The message attached to the error when the string is not a valid URL
   */
  message: string
}

/**
 * Ensure that a string is a well-formed URL
 */
export const uniformResourceLocator = ({ message }: UniformResourceLocatorOptions): Kalel.StringRule => {
  return {
    message,
    valid: value => {
      return /^(\w+:\/\/)?(\w+\.)?\w+\.\w+(:\d+)?(\/\w+)*(\?\w+(=\w+)?)?(&\w+(=\w+)?)*(#\w+)?$/.test(value);
    }
  };
};
