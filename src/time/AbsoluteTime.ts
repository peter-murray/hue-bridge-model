import { ABSOLUTE_TIME_REGEX } from './timeUtil';
import { HueTime } from './HueTime';
import { HueDate } from './HueDate';
import { HueBridgeModelError } from '../HueBridgeModelError';
import { BridgeTime, TimeComponentValue } from './BridgeTime';

type TimeValue = string | Date | AbsoluteTime

export class AbsoluteTime extends BridgeTime {

  private time: HueTime = new HueTime();

  private date: HueDate = new HueDate();

  constructor(value?: TimeValue) {
    super();

    if (value) {
      this.value = value;
    }
  }

  static matches(value: any): boolean {
    return ABSOLUTE_TIME_REGEX.test(value);
  }

  set value(value: TimeValue) {
    if (value instanceof AbsoluteTime) {
      // Re-enter this function using the string value
      this.value = value.toString();
    } else if (value instanceof Date) {
      this.time.fromDate(value);
      this.date.fromDate(value);
    } else {
      const parsed = ABSOLUTE_TIME_REGEX.exec(value);
      if (parsed) {
        // @ts-ignore
        this.hours(parsed.groups.hours);
        // @ts-ignore
        this.minutes(parsed.groups.minutes);
        // @ts-ignore
        this.seconds(parsed.groups.seconds);

        // @ts-ignore
        this.year(parsed.groups.year);
        // @ts-ignore
        this.month(parsed.groups.month);
        // @ts-ignore
        this.day(parsed.groups.day);
      } else {
        throw new HueBridgeModelError(`Cannot create an absolute time from ${value}`);
      }
    }
  }

  year(value: TimeComponentValue): AbsoluteTime {
    this.date.year = value;
    return this;
  }

  month(value: TimeComponentValue): AbsoluteTime {
    this.date.month = value;
    return this;
  }

  day(value: TimeComponentValue): AbsoluteTime {
    this.date.day = value;
    return this;
  }

  hours(value: TimeComponentValue): AbsoluteTime {
    this.time.hours = value;
    return this;
  }

  minutes(value: TimeComponentValue): AbsoluteTime {
    this.time.minutes = value;
    return this;
  }

  seconds(value: TimeComponentValue): AbsoluteTime {
    this.time.seconds = value;
    return this;
  }

  toString(): string {
    return `${this.date.toString()}T${this.time.toString()}`;
  }
}