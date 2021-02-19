import { RECURRING_TIME_REGEX, WEEKDAY_ATTRIBUTE, WEEKDAYS } from './timeUtil';
import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { HueTime } from './HueTime';
import { HueBridgeModelError } from '../HueBridgeModelError';

export class RecurringTime extends BridgeTime {

  protected _time: HueTime;

  protected _weekdays?: number;

  constructor(...args: any[]) {
    super();
    this._time = new HueTime();
    this._weekdays = WEEKDAYS.ALL;

    if (arguments.length > 0) {
      this.setValue(...arguments);
    }
  }

  static matches(value: any): boolean {
    return RECURRING_TIME_REGEX.test(value);
  }

  setValue(...argsValue: any[]): RecurringTime {
    // This is all a little convoluted due to large number of parameters it supports, could do with some work on making
    // it clearer as to the path (although tests do provide coverage).
    let weekdays = null
      , date = null
    ;

    const args = Array.from(arguments).filter(arg => arg !== undefined && arg !== null);

    if (args.length > 1) {
      weekdays = args[0];
      date = args[1];
    } else if (args.length === 1) {
      const argOne = args[0];
      if (argOne instanceof RecurringTime) {
        // @ts-ignore
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

    const parsed = RECURRING_TIME_REGEX.exec(arguments[0]);
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
      return this;
    }

    if (!weekdays && !date) {
      const values = Array.from(arguments).join(', ');
      throw new HueBridgeModelError(`Cannot create an recurring time from ${values}`);
    }

    return this;
  }

  get weekdaysString(): string {
    return `${this._weekdays}`.padStart(3, '0');
  }

  weekdays(value: number) {
    // @ts-ignore
    this._weekdays = WEEKDAY_ATTRIBUTE.getValue(value);
    return this;
  }

  hours(value: TimeComponentValue) {
    this._time.hours = value;
    return this;
  }

  minutes(value: TimeComponentValue) {
    this._time.minutes = value;
    return this;
  }

  seconds(value: TimeComponentValue) {
    this._time.seconds = value;
    return this;
  }

  toString(): string {
    return `W${this.weekdaysString}/T${this._time.toString()}`;
  }
};