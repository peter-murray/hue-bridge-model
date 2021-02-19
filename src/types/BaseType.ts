export function isValueDefined(value: any): boolean {
  return value !== null && value !== undefined && value !== Number.NaN;
}

export type NullableTypeValue<T> = T | null;

interface InternalTypeConfig<T> extends TypeConfig<T> {
  type: string,
}

export class BaseType<T> {

  public readonly name: string;
  public readonly type: string;

  public readonly defaultValue?: any;
  public readonly optional: boolean

  constructor(config: InternalTypeConfig<T>) {
    if (!config.name) {
      throw new TypeError('A name must be specified');
    }
    // this._name = config.name;
    this.name = config.name;

    if (!config.type) {
      throw new TypeError('A type must be specified');
    }
    this.type = config.type;

    // Optional configuration values
    this.optional = Boolean(isValueDefined(config.optional) ? config.optional : true);
    this.defaultValue = isValueDefined(config.defaultValue) ? config.defaultValue : null; // null is considered unset in a Type
  }

  hasDefaultValue() {
    return isValueDefined(this.defaultValue);
  }

  getValue(val: any): NullableTypeValue<T> {
    if (isValueDefined(val)) {
      return this._convertToType(val);
    } else {
      if (this.hasDefaultValue()) {
        return this._convertToType(this.defaultValue);
      } else {
        if (this.optional) {
          // Value not defined (i.e. null or undefined or Number.NaN)
          return null;
        } else {
          throw new TypeError(`No value provided and '${this.name}' is not optional`);
        }
      }
    }
  }

  _convertToType(val: any): NullableTypeValue<T> {
    return val;
  }
}

export interface TypeConfig<T> {
  name: string
  optional?: boolean
  defaultValue?: T
}

export interface BooleanTypeConfig extends TypeConfig<boolean> {
}

export interface ChoiceTypeConfig<T> extends TypeConfig<T> {
  validValues: T[]
}

export interface NumberTypeConfig extends TypeConfig<number> {
  min?: number
  max?: number
}

export interface StringTypeConfig extends TypeConfig<string> {
  //TODO make these reference length
  minLength?: number
  maxLength?: number
}

export interface RangedNumberTypeConfig extends NumberTypeConfig {
  typeMin: number
  typeMax: number
}

export interface ListTypeConfig<T> extends TypeConfig<T> {
  minEntries: number
  maxEntries?: number
  entryType: BaseType<T>
}

export interface ObjectTypeConfig extends TypeConfig<any> {
  types?: BaseType<any>[],
}