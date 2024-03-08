export class Validator {
  static validate(value, rules, name) {
    let errors = [];
    let isValid = true;

    for (let rule in rules) {
      switch (rule) {
        case "required":
          if (!this.required(value)) {
            errors.push(`${name} required`);
            isValid = false;
          }
          break;
        case "minChar":
          if (!this.minChar(value, rules[rule])) {
            errors.push(
              `${name} must have a minimum of ${rules[rule]} characters`
            );
            isValid = false;
          }
          break;
        case "maxChar":
          if (!this.maxChar(value, rules[rule])) {
            errors.push(
              `${name} must have a maximum of ${rules[rule]} characters`
            );
            isValid = false;
          }
          break;
        case "isEmail":
          if (!this.isEmail(value)) {
            errors.push(`Please enter a valid email for ${name}`);
            isValid = false;
          }
          break;
        case "equals":
          if (!this.equals(value, rules[rule])) {
            errors.push(`${name} must be equal to ${rules[rule]}`);
            isValid = false;
          }
          break;
        default:
          console.log("Unknown rule: " + rule);
      }
    }
    return {
      error: !isValid,
      errors: errors,
    };
  }

  static required(value) {
    return value.trim().length > 0;
  }

  static minChar(value, limit) {
    return value.length >= limit;
  }

  static maxChar(value, limit) {
    return value.length <= limit;
  }

  static isEmail(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  static equals(value, comparisonValue) {
    const valueToCompare =
      typeof comparisonValue === "function"
        ? comparisonValue()
        : comparisonValue;
    return value === valueToCompare;
  }
}
