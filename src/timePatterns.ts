import {
  ABSOLUTE_TIME_REGEX,
  RANDOMIZED_TIME_REGEX, RANDOMIZED_TIMER_REGEX, RECURRING_RANDOMIZED_TIME_REGEX, RECURRING_RANDOMIZED_TIMER_REGEX,
  RECURRING_TIME_REGEX, RECURRING_TIMER_REGEX,
  TIME_INTERVAL_REGEX,
  TIMER_REGEX
} from './time/timeUtil';
import { AbsoluteTime } from './time/AbsoluteTime';
import { RecurringTime } from './time/RecurringTime';
import { Timer } from './time/Timer';
import { TimeInterval } from './time/TimeInterval';
import { RandomizedTime } from './time/RandomizedTime';
import { RecurringRandomizedTime } from './time/RecurringRandomizedTime';
import { RecurringTimer } from './time/RecurringTimer';
import { RandomizedTimer } from './time/RandomizedTimer';
import { RecurringRandomizedTimer } from './time/RecurringRandomizedTimer';
import { HueBridgeModelError } from './HueBridgeModelError';

export { isRecurring, isTimePattern } from './time/timeUtil';

export {
  AbsoluteTime,
  RecurringTime,
  Timer,
  TimeInterval,
  RandomizedTime,
  RecurringRandomizedTime,
  RecurringTimer,
  RandomizedTimer,
  RecurringRandomizedTimer
};

export function createFromString(str: string) {
  if (ABSOLUTE_TIME_REGEX.test(str)) {
    return new AbsoluteTime(str);
  } else if (RECURRING_TIME_REGEX.test(str)) {
    return new RecurringTime(str);
  } else if (TIMER_REGEX.test(str)) {
    return new Timer(str);
  } else if (TIME_INTERVAL_REGEX.test(str)) {
    return new TimeInterval(str);
  } else if (RANDOMIZED_TIME_REGEX.test(str)) {
    return new RandomizedTime(str);
  } else if (RECURRING_RANDOMIZED_TIME_REGEX.test(str)) {
    return new RecurringRandomizedTime(str);
  } else if (RECURRING_TIMER_REGEX.test(str)) {
    return new RecurringTimer(str);
  } else if (RANDOMIZED_TIMER_REGEX.test(str)) {
    return new RandomizedTimer(str);
  } else if (RECURRING_RANDOMIZED_TIMER_REGEX.test(str)) {
    return new RecurringRandomizedTimer(str);
  } else {
    throw new HueBridgeModelError(`Unable to determine a valid time pattern for string: "${str}"`);
  }
}

// export function isTimePattern(str: string): boolean {
//   return AbsoluteTime.matches(str)
//     || RecurringTime.matches(str)
//     || RandomizedTime.matches(str)
//     || RecurringRandomizedTime.matches(str)
//     || Timer.matches(str)
//     || RecurringTimer.matches(str)
//     || RandomizedTimer.matches(str)
//     || RecurringRandomizedTimer.matches(str);
// }

// export function createAbsoluteTime(value: string | Date | AbsoluteTime) {
//   return new AbsoluteTime(value);
// }
//
// export function createRandomizedTime(value: string | Date | RandomizedTime) {
//   return new RandomizedTime(value);
// }
//
// export function createRecurringTime(weekdays: number, value: string | Date | RecurringTime) {
//   return new RecurringTime(weekdays, value);
// }
//
// export function createRecurringRandomizedTime(value: string | Date | RecurringRandomizedTime) {
//   return new RecurringRandomizedTime(value);
// }
//
// export function createTimeInterval(value: string | TimeInterval) {
//   return new TimeInterval(value);
// }
//
// export function createTimer(value: string | Timer) {
//   return new Timer(value);
// }
//
// export function createRecurringTimer(value: string | Date | RecurringTimer) {
//   return new RecurringTimer(value);
// }
//
// export function createRandomizedTimer(value: string | RandomizedTimer) {
//   return new RandomizedTimer(value);
// }
//
// export function createRecurringRandomizedTimer(value: string | RecurringRandomizedTimer) {
//   return new RecurringRandomizedTimer(value);
// }