import { BaseType } from './BaseType';
import { isValueDefined, StringTypeConfig } from './BaseType';

export class StringType extends BaseType<string> {

  readonly minLength?: number

  readonly maxLength?: number

  constructor(config: StringTypeConfig) {
    super({...config, type: 'string'});

    if (isValueDefined(config.minLength)) {
      this.minLength = config.minLength;
    }

    if (isValueDefined(config.maxLength)) {
      this.maxLength = config.maxLength;
    }
  }

  getValue(value: any) {
    const checkedValue: string | null = super.getValue(value)
      , valueDefined = isValueDefined(checkedValue)
      , optional = this.optional
    ;

    // If we are optional and have no value, prevent further checks as they will fail
    if (optional && !valueDefined) {
      return checkedValue;
    }

    // 0 will not trigger this, but it is not a problem in this context
    if (this.minLength) {
      if (!valueDefined) {
        throw new TypeError(`No value provided for ${this.name}, must have a minimum length of ${this.minLength}`);
      } else { // @ts-ignore
        if (checkedValue.length < this.minLength) {
          throw new TypeError(`'${value}' for ${this.name}, does not meet minimum length requirement of ${this.minLength}`);
        }
      }
    }

    // 0 will not trigger this, but it is not a problem in this context, although max length of 0 is not really valid
    if (this.maxLength) {
      // @ts-ignore
      if (valueDefined && checkedValue.length > this.maxLength) {
        throw new TypeError(`'${value}' for ${this.name}, does not meet maximum length requirement of ${this.maxLength}`);
      }
    }
    return checkedValue;
  }

  _convertToType(val: any) {
    return `${val}`;
  }
}