import { HueTime } from './HueTime';
import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { TIME_INTERVAL_REGEX, WEEKDAY_ATTRIBUTE, WEEKDAYS } from './timeUtil';
import { HueBridgeModelError } from '../HueBridgeModelError';

export class TimeInterval extends BridgeTime {

  private _from: HueTime;

  private _to: HueTime;

  private _weekdays: number;

  constructor(...args: any[]) {
    super();
    this._from = new HueTime();
    this._to = new HueTime();
    this._weekdays = WEEKDAYS.ALL;

    if (arguments.length > 0) {
      this.setValue(...arguments);
    }
  }

  static matches(value: any): boolean {
    return TIME_INTERVAL_REGEX.test(value);
  }

  setValue(...args: any[]): void {
    const argOne = arguments[0];
    if (argOne instanceof TimeInterval) {
      return this.setValue(argOne.toString());
    } else {
      const parsed = TIME_INTERVAL_REGEX.exec(arguments[0]);
      if (parsed) {
        // @ts-ignore
        this._from.hours = parsed.groups.fromhours;
        // @ts-ignore
        this._from.minutes = parsed.groups.fromminutes;
        // @ts-ignore
        this._from.seconds = parsed.groups.fromseconds;

        // @ts-ignore
        this._to.hours = parsed.groups.tohours;
        // @ts-ignore
        this._to.minutes = parsed.groups.tominutes;
        // @ts-ignore
        this._to.seconds = parsed.groups.toseconds;

        // @ts-ignore
        this.weekdays(parsed.groups.weekdays);
      } else {
        const args = Array.from(arguments).join(', ');
        throw new HueBridgeModelError(`Cannot create a TimeInterval from ${args}`);
      }
    }
  }

  get weekdaysString() {
    return `${this._weekdays}`.padStart(3, '0');
  }

  weekdays(value: TimeComponentValue) {
    // @ts-ignore
    this._weekdays = WEEKDAY_ATTRIBUTE.getValue(value);
    return this;
  }

  from(date: Date) {
    this._from.fromDate(date);
    return this;
  }

  fromHours(value: TimeComponentValue) {
    this._from.hours = value;
    return this;
  }

  fromMinutes(value: TimeComponentValue) {
    this._from.minutes = value;
    return this;
  }

  fromSeconds(value: TimeComponentValue) {
    this._from.seconds = value;
    return this;
  }

  to(date: Date) {
    this._to.fromDate(date);
    return this;
  }

  toHours(value: TimeComponentValue) {
    this._to.hours = value;
    return this;
  }

  toMinutes(value: TimeComponentValue) {
    this._to.minutes = value;
    return this;
  }

  toSeconds(value: TimeComponentValue) {
    this._to.seconds = value;
    return this;
  }

  toString(): string {
    return `W${this.weekdaysString}/T${this._from.toString()}/T${this._to.toString()}`;
  }
}