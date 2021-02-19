import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { HueTime } from './HueTime';
import { RANDOMIZED_TIMER_REGEX } from './timeUtil';
import { HueBridgeModelError } from '../HueBridgeModelError';

type TimeValue = string | RandomizedTimer

export class RandomizedTimer extends BridgeTime {

  private _time: HueTime;

  private _random: HueTime;

  constructor(value? : TimeValue) {
    super();
    this._time = new HueTime();
    this._random = new HueTime();

    if (value) {
      this.value = value;
    }
  }

  static matches(value: any): boolean {
    return RANDOMIZED_TIMER_REGEX.test(value);
  }

  set value(value: TimeValue) {
    if (value instanceof RandomizedTimer) {
      // Re-enter this function using the string value
      this.value = value.toString();
    } else {
      const parsed = RANDOMIZED_TIMER_REGEX.exec(value);
      if (parsed) {
        const time = this._time;
        // @ts-ignore
        time.hours = parsed.groups.hours;
        // @ts-ignore
        time.minutes = parsed.groups.minutes;
        // @ts-ignore
        time.seconds = parsed.groups.seconds;

        const random = this._random;
        // @ts-ignore
        random.hours = parsed.groups.randomhours;
        // @ts-ignore
        random.minutes = parsed.groups.randomminutes;
        // @ts-ignore
        random.seconds = parsed.groups.randomseconds;
      } else {
        throw new HueBridgeModelError(`Cannot create a RandomizedTimer from ${value}`);
      }
    }
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
    return `PT${this._time.toString()}A${this._random.toString()}`;
  }
}