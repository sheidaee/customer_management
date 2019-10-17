import { Validate } from "./types";

/**
 * update old object immutable
 *
 * @param {object} oldObject
 * @param {object} updatedProperties
 * @returns updated object
 */
export function updateObject(oldObject: object, updatedProperties: object) {
  return {
    ...oldObject,
    ...updatedProperties
  };
}

interface Roles {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isNumeric?: boolean;
  customerLifetimeValue?: string;
}

/**
 * validating form field
 *
 * @export
 * @param {string|number} value
 * @param {object} rules
 * @returns true if is valid
 */
export function checkValidity(value: any, rules: Roles) {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}

/**
 * Joining strings with space
 *
 * @param {array|string} class names
 * @param {array} rest
 *
 * @returns {string} class names
 */
export function classNames(classes: string[] | string, ...rest: string[]) {
  if (classes && classes.constructor === Array) {
    return (classes as string[]).join(" ");
  } else if (arguments[0] !== undefined) {
    return [...(classes as []), ...rest].join(" ");
  }

  return "";
}

export const validate = (values: Validate) => {
  const errors: any = {};

  if (!values.first) errors.first = "Please enter you first name";

  if (!values.last) errors.last = "Please enter you last name";

  if (!values.gender || values.gender === "...")
    errors.gender = "Please select your gender";

  if (!values.birthday) errors.birthday = "Please enter your birthday";

  return errors;
};
