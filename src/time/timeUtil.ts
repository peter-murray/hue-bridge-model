import { UInt8Type } from '../types/UInt8Type';
import { BridgeTime } from './BridgeTime';

export const ABSOLUTE_TIME_REGEX = new RegExp(`${getDatePattern()}T${getTimePattern()}`);
export const RANDOMIZED_TIME_REGEX = new RegExp(`^${getDatePattern()}T${getTimePattern()}A${getTimePattern('random')}$`);
export const RANDOMIZED_TIMER_REGEX = new RegExp(`^PT${getTimePattern()}A${getTimePattern('random')}$`);
export const RECURRING_RANDOMIZED_TIME_REGEX = new RegExp(`^W(?<weekdays>[0-9]{3})/T${getTimePattern()}A${getTimePattern('random')}$`);
export const RECURRING_RANDOMIZED_TIMER_REGEX = new RegExp(`^R(?<times>[0-9]{0,2})/PT${getTimePattern()}A${getTimePattern('random')}$`);
export const RECURRING_TIME_REGEX = new RegExp(`^W(?<weekdays>[0-9]{3})/T${getTimePattern()}$`);
export const RECURRING_TIMER_REGEX = new RegExp(`^R(?<times>[0-9]{0,2})/PT${getTimePattern()}$`);
export const TIME_INTERVAL_REGEX = new RegExp(`^W(?<weekdays>[0-9]{3})/T${getTimePattern('from')}/T${getTimePattern('to')}$`);
export const TIMER_REGEX = new RegExp(`^PT${getTimePattern()}$`);

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

export function isTimePattern(str: string): boolean {
  return ABSOLUTE_TIME_REGEX.test(str)
    || RECURRING_TIME_REGEX.test(str)
    || RANDOMIZED_TIME_REGEX.test(str)
    || RECURRING_RANDOMIZED_TIME_REGEX.test(str)
    || TIMER_REGEX.test(str)
    || RECURRING_TIMER_REGEX.test(str)
    || RANDOMIZED_TIMER_REGEX.test(str)
    || RECURRING_RANDOMIZED_TIMER_REGEX.test(str);
}

export function isRecurring(value: any) {
  let valueToTest: any;
  if (value instanceof BridgeTime) {
    valueToTest = value.toString();
  } else {
    valueToTest = value;
  }

  return RECURRING_TIME_REGEX.test(valueToTest)
    || RECURRING_RANDOMIZED_TIME_REGEX.test(valueToTest)
    || RECURRING_TIMER_REGEX.test(valueToTest)
    || RECURRING_RANDOMIZED_TIMER_REGEX.test(valueToTest);
}