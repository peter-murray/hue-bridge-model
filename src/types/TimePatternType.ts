import Type, { isValueDefined } from './Type';
import { TypeConfig } from './TypeConfig';
import { createFromString, isBridgeTime, isTimePattern } from '../timePatterns/index';
import HueBridgeModelError from '../HueBridgeModelError';
import BridgeTime from '../timePatterns/BridgeTime';


export default class TimePatternType extends Type<BridgeTime> {

  constructor(config: TypeConfig<string>) {
    super({...config, type: 'timePattern'});
  }

  getValue(value: any) {
    const checkedValue = super.getValue(value)
      , isDefined = isValueDefined(checkedValue)
      , optional = this.optional
    ;

    // If we are optional and have no value, prevent further checks as they will fail
    if (optional && !isDefined) {
      return checkedValue;
    }

    if (isBridgeTime(value)) {
      return value.toString();
    } else if (isTimePattern(value)) {
      return createFromString(value).toString();
    } else {
      //TODO may need to cater for a string
      throw new HueBridgeModelError(`Cannot convert value "${value}" to a valid TimePatten`);
    }
  }

  _convertToType(val: any) {
    return createFromString(`${val}`);
  }
};