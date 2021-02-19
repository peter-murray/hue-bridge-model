import { RECURRING_RANDOMIZED_TIME_REGEX } from './timeUtil';
import { RecurringTime } from './RecurringTime';
import { HueTime } from './HueTime';
import { HueBridgeModelError } from '../HueBridgeModelError';
import { TimeComponentValue } from './BridgeTime';

export class RecurringRandomizedTime extends RecurringTime {

  private readonly _random: HueTime;

  constructor(...args: any[]) {
    super();
    this._random = new HueTime();

    if (arguments.length > 0) {
      this.setValue(...arguments);
    }
  }

  static matches(value: any) {
    return RECURRING_RANDOMIZED_TIME_REGEX.test(value);
  }

  setValue(...args: any[]): RecurringRandomizedTime {
    // This is all a little convoluted due to large number of parameters it supports, could do with some work on making
    // it clearer as to the path (although tests do provide coverage).
    let weekdays = null
      , date = null
    ;

    if (arguments.length > 1) {
      weekdays = arguments[0];
      date = arguments[1];
    } else if (arguments.length === 1) {
      const argOne = arguments[0];
      if (argOne instanceof RecurringRandomizedTime) {
        return this.setValue(argOne.toString());
      } else if (argOne instanceof Date) {
        date = argOne
      } else if (Number.isInteger(argOne)) {
        weekdays = argOne;
      }
    }

    if (date) {
      this._time.fromDate(date);
    }

    if (weekdays) {
      this.weekdays(weekdays);
    }

    const parsed = RECURRING_RANDOMIZED_TIME_REGEX.exec(arguments[0]);
    if (parsed) {
      const time = this._time;
      // @ts-ignore
      time.hours = parsed.groups.hours;
      // @ts-ignore
      time.minutes = parsed.groups.minutes;
      // @ts-ignore
      time.seconds = parsed.groups.seconds;

      // @ts-ignore
      this.weekdays(parsed.groups.weekdays);

      const random = this._random;
      // @ts-ignore
      random.hours = parsed.groups.randomhours;
      // @ts-ignore
      random.minutes = parsed.groups.randomminutes;
      // @ts-ignore
      random.seconds = parsed.groups.randomseconds;

      return this;
    }

    if (!weekdays && !date) {
      const values = Array.from(arguments).join(', ');
      throw new HueBridgeModelError(`Cannot create an recurring time from ${values}`);
    }

    return this;
  }

  randomHours(value: TimeComponentValue) {
    this._random.hours = value;
    return this;
  }

  randomMinutes(value: TimeComponentValue) {
    this._random.minutes = value;
    return this;
  }

  randomSeconds(value: TimeComponentValue) {
    this._random.seconds = value;
    return this;
  }

  toString(): string {
    return `${super.toString()}A${this._random.toString()}`;
  }
}