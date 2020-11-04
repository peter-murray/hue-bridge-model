import BridgeTime from './BridgeTime';
import RecurringTime from './RecurringTime';
import RecurringRandomizedTime from './RecurringRandomizedTime';
import RecurringTimer from './RecurringTimer';
import RecurringRandomizedTimer from './RecurringRandomizedTimer';
import AbsoluteTime from './AbsoluteTime';
import Timer from './Timer';
import RandomizedTime from './RandomizedTime';
import RandomizedTimer from './RandomizedTimer';
import HueBridgeModelError from '../HueBridgeModelError';
import TimeInterval from './TimeInterval';

//TODO need to double check this
export function isBridgeTime(obj: BridgeTime | string): obj is BridgeTime {
  return ((obj as BridgeTime).toString) !== undefined;
}

export function isRecurring(value: any) {
  if (isBridgeTime(value)) {
    return value instanceof RecurringTime
      || value instanceof RecurringRandomizedTime
      || value instanceof RecurringTimer
      || value instanceof RecurringRandomizedTimer;
  } else {
    return RecurringTime.matches(value)
      || RecurringRandomizedTime.matches(value)
      || RecurringTimer.matches(value)
      || RecurringRandomizedTimer.matches(value);
  }
}

export function createFromString(str: string) {
  if (AbsoluteTime.matches(str)) {
    return new AbsoluteTime(str);
  } else if (RecurringTime.matches(str)) {
    return new RecurringTime(str);
  } else if (Timer.matches(str)) {
    return new Timer(str);
  } else if (TimeInterval.matches(str)) {
    return new TimeInterval(str);
  } else if (RandomizedTime.matches(str)) {
    return new RandomizedTime(str);
  } else if (RecurringRandomizedTime.matches(str)) {
    return new RecurringRandomizedTime(str);
  } else if (RecurringTimer.matches(str)) {
    return new RecurringTimer(str);
  } else if (RandomizedTimer.matches(str)) {
    return new RandomizedTimer(str);
  } else if (RecurringRandomizedTimer.matches(str)) {
    return new RecurringRandomizedTimer(str);
  } else {
    throw new HueBridgeModelError(`Unable to determine a valid time pattern for string: "${str}"`);
  }
}

export function isTimePattern(str: string): boolean {
  return AbsoluteTime.matches(str)
    || RecurringTime.matches(str)
    || RandomizedTime.matches(str)
    || RecurringRandomizedTime.matches(str)
    || Timer.matches(str)
    || RecurringTimer.matches(str)
    || RandomizedTimer.matches(str)
    || RecurringRandomizedTimer.matches(str);
}

export function createAbsoluteTime(value: string | Date | AbsoluteTime) {
  return new AbsoluteTime(value);
}

export function createRandomizedTime(value: string | Date | RandomizedTime) {
  return new RandomizedTime(value);
}

export function createRecurringTime(weekdays: number, value: string | Date | RecurringTime) {
  return new RecurringTime(weekdays, value);
}

export function createRecurringRandomizedTime(value: string | Date | RecurringRandomizedTime) {
  return new RecurringRandomizedTime(value);
}

export function createTimeInterval(value: string | TimeInterval) {
  return new TimeInterval(value);
}

export function createTimer(value: string | Timer) {
  return new Timer(value);
}

export function createRecurringTimer(value: string | Date | RecurringTimer) {
  return new RecurringTimer(value);
}

export function createRandomizedTimer(value: string | RandomizedTimer) {
  return new RandomizedTimer(value);
}

export function createRecurringRandomizedTimer(value: string | RecurringRandomizedTimer) {
  return new RecurringRandomizedTimer(value);
}