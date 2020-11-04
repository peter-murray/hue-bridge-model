import Type from './Type';
import { isValueDefined } from './Type';
import { BooleanTypeConfig } from './TypeConfig';

export default class BooleanType extends Type<boolean> {

  constructor(config: BooleanTypeConfig) {
    super({...{type: 'boolean'}, ...config});
  }

  getValue(val: any): boolean {
    if (isValueDefined(val)) {
      return Boolean(val);
    } else {
      if (this.hasDefaultValue()) {
        return Boolean(this.defaultValue);
      } else {
        if (this.optional) {
          return val;
        } else {
          throw new TypeError(`No value provided and '${this.name}' is not optional`);
        }
      }
    }
  }
}