import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { HueTime } from './HueTime';
import { HueBridgeModelError } from '../HueBridgeModelError';
import { TIMER_REGEX } from './timeUtil';

type TimeValue = Timer | string;

export class Timer extends BridgeTime {

  private time: HueTime;

  constructor(value?: TimeValue) {
    super();
    this.time = new HueTime();

    if (value) {
      this.value = value;
    }
  }

  static matches(value: any): boolean {
    return TIMER_REGEX.test(value);
  }

  set value(value: TimeValue) {
    if (value instanceof Timer) {
      this.value = value.toString();
    } else {
      const parsed = TIMER_REGEX.exec(value);

      if (parsed) {
        // @ts-ignore
        this.time.hours = parsed.groups.hours;
        // @ts-ignore
        this.time.minutes = parsed.groups.minutes;
        // @ts-ignore
        this.time.seconds = parsed.groups.seconds;
      } else {
        throw new HueBridgeModelError(`Cannot create a Timer from ${value}`);
      }
    }
  }

  hours(value: TimeComponentValue) {
    this.time.hours = value;
    return this;
  }

  minutes(value: TimeComponentValue) {
    this.time.minutes = value;
    return this;
  }

  seconds(value: TimeComponentValue) {
    this.time.seconds = value;
    return this;
  }

  toString(): string {
    return `PT${this.time.toString()}`;
  }
}