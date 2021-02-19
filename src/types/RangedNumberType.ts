import { BaseType } from './BaseType';
import { isValueDefined, NullableTypeValue, RangedNumberTypeConfig } from './BaseType';

export class RangedNumberType extends BaseType<number> {

  readonly min: number;

  readonly max: number;

  constructor(config: RangedNumberTypeConfig) {
    super({...{type: 'RangedNumber'}, ...config});

    if (isValueDefined(config.min)) {
      // @ts-ignore
      this.min = config.min;
    } else {
      this.min = config.typeMin;
    }

    if (isValueDefined(config.max)) {
      // @ts-ignore
      this.max = config.max;
    } else{
      this.max = config.typeMax;
    }
  }

  getValue(value: any): NullableTypeValue<number> {
    const numberValue = super.getValue(value);

    // Value has been checked in the super function and is optional
    if (numberValue === null) {
      return null;
    }

    // Invalid input value
    if (Number.isNaN(numberValue)) {
      throw new TypeError(`Failure to convert value for ${this.name}, value, '${value}' is not a parsable number'`);
    }

    if (this.isValueInRange(numberValue)) {
      return numberValue;
    } else {
      throw new TypeError(`Value, '${numberValue}' is not within allowed limits: min=${this.min} max=${this.max} for '${this.name}'`);
    }
  }

  _convertToType(val: any): number {
    return Number(val);
  }

  isValueInRange(value: number): boolean {
    return value >= this.min && value <= this.max;
  }

  getRange(): number {
    // return this.max - this.min; //TODO brightness has a lower bound of 1, which can generate quirks
    return this.max;
  }
}