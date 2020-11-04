import Type from './Type';

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
  entryType: Type<T>
}

export interface ObjectTypeConfig extends TypeConfig<any> {
  types?: Type<any>[],
}