import UInt8Type from '../types/UInt8Type';

export function getTimePattern(name?: string): string {
  const two_digits = '[0-9]{2}'
    , prefix = name || ''
  ;

  return `(?<${prefix}hours>${two_digits}):(?<${prefix}minutes>${two_digits}):(?<${prefix}seconds>${two_digits})`;
}

export function getDatePattern(name?: string): string {
  const two_digits = '[0-9]{2}'
    , four_digits = '[0-9]{4}'
    , prefix = name || ''
  ;
  return `(?<${prefix}year>${four_digits})-(?<${prefix}month>${two_digits})-(?<${prefix}day>${two_digits})`;
}

export enum WEEKDAYS {
  MONDAY = 64,
  TUESDAY = 32,
  WEDNESDAY = 16,
  THURSDAY = 8,
  FRIDAY = 4,
  SATURDAY = 2,
  SUNDAY = 1,
  WEEKDAY = 124,
  WEEKEND = 3,
  ALL = 127,
}


export const REOCCURRANCE_ATTRIBUTE = new UInt8Type({
  name: 'reoccurs',
  min: 0,
  max: 99,
  defaultValue: 0,
  optional: true
});

export const WEEKDAY_ATTRIBUTE = new UInt8Type({
  name: 'weekdays',
  min: 1,
  max: WEEKDAYS.ALL
});