import { BaseType } from './BaseType';
import { isValueDefined, ObjectTypeConfig } from './BaseType';

interface LooseObject {
  [key: string]: any
}

export class ObjectType extends BaseType<LooseObject> {

  public types?: BaseType<any>[]

  public childRequiredKeys: string[]

  constructor(config: ObjectTypeConfig) {
    super({...config, type: 'object'});

    this.types = config.types;

    if (! isValueDefined(config.types)) {
      this.childRequiredKeys = [];
    } else {
      const childRequiredKeys: string[] = [];

      // @ts-ignore
      config.types.forEach(type => {
        if (!type.optional) {
          childRequiredKeys.push(type.name);
        }
      });

      this.childRequiredKeys = childRequiredKeys;
    }
  }

  _convertToType(val: LooseObject) {
    const result = this._getObject(val);
    this._validateRequiredKeys(result);

    if (Object.keys(result).length === 0) {
      if (this.optional) {
        return null;
      } else {
        throw new TypeError(`Empty object created from data provided, but the object is not optional`);
      }
    }

    return result;
  }

  _getObject(val: LooseObject) {
    // We have a free form object type
    if (!this.types) {
      return Object.assign({}, val);
    }

    const result: LooseObject = {};

    // Build the object based off the definitions for the keys
    this.types.forEach(typeAttribute => {
      const name: string = typeAttribute.name
        , typeValue: any = typeAttribute.getValue(val[name])
      ;

      if (isValueDefined(typeValue)) {
        result[name] = typeValue;
      }
    });
    return result;
  }


  _validateRequiredKeys(result: any) {
    if (this.childRequiredKeys.length > 0) {
      const valueKeys = Object.keys(result);

      this.childRequiredKeys.forEach(requiredKey => {
        if (valueKeys.indexOf(requiredKey) === -1) {
          throw new TypeError(`Required key '${requiredKey}' is missing from the object`);
        }
      });
    }
  }
}


