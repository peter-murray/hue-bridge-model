import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { RANDOMIZED_TIME_REGEX } from './timeUtil';
import { HueTime } from './HueTime';
import { HueDate } from './HueDate';
import { HueBridgeModelError } from '../HueBridgeModelError';

type TimeValue = string | RandomizedTime | Date

export class RandomizedTime extends BridgeTime {

  private date: HueDate = new HueDate();
  private time: HueTime = new HueTime();
  private random: HueTime = new HueTime();

  constructor(value?: TimeValue) {
    super();
    this.time = new HueTime();
    this.date = new HueDate();
    this.random = new HueTime();

    if (value) {
      this.value = value;
    }
  }

  static matches(value: any) {
    return RANDOMIZED_TIME_REGEX.test(value);
  }

  set value(value: TimeValue) {
    if (value instanceof RandomizedTime) {
      // Re-enter this function using string value
      this.value = value.toString();
    } else if (value instanceof Date) {
      this.time.fromDate(value);
      this.date.fromDate(value);
      this.random = new HueTime();
    } else {
      const parsed = RANDOMIZED_TIME_REGEX.exec(value);
      if (parsed) {
        const time = this.time;
        // @ts-ignore
        time.hours = parsed.groups.hours;
        // @ts-ignore
        time.minutes = parsed.groups.minutes;
        // @ts-ignore
        time.seconds = parsed.groups.seconds;

        const date = this.date;
        // @ts-ignore
        date.year = parsed.groups.year;
        // @ts-ignore
        date.month = parsed.groups.month;
        // @ts-ignore
        date.day = parsed.groups.day;

        const random = this.random;
        // @ts-ignore
        random.hours = parsed.groups.randomhours;
        // @ts-ignore
        random.minutes = parsed.groups.randomminutes;
        // @ts-ignore
        random.seconds = parsed.groups.randomseconds;
      } else {
        throw new HueBridgeModelError(`Cannot create a randomized time from ${value}`);
      }
    }
  }

  year(value: TimeComponentValue) {
    this.date.year = value;
    return this;
  }

  month(value: TimeComponentValue) {
    this.date.month = value;
    return this;
  }

  day(value: TimeComponentValue) {
    this.date.day = value;
    return this;
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

  randomHours(value: TimeComponentValue) {
    this.random.hours = value;
    return this;
  }

  randomMinutes(value: TimeComponentValue) {
    this.random.minutes = value;
    return this;
  }

  randomSeconds(value: TimeComponentValue) {
    this.random.seconds = value;
    return this;
  }

  toString(): string {
    return `${this.date.toString()}T${this.time.toString()}A${this.random.toString()}`;
  }

  //TODO need to add support for random elements, along with other values hours, minutes, etc...
};