import { BridgeTime, TimeComponentValue } from './BridgeTime';
import { HueTime } from './HueTime';
import { RECURRING_RANDOMIZED_TIMER_REGEX, REOCCURRANCE_ATTRIBUTE } from './timeUtil';
import { HueBridgeModelError } from '../HueBridgeModelError';

type TimeValue = string | RecurringRandomizedTimer;

export class RecurringRandomizedTimer extends BridgeTime {

  private readonly time: HueTime;

  private readonly random: HueTime;

  private reocurrance: number;

  constructor(value?: TimeValue) {
    super();
    this.time = new HueTime();
    this.random = new HueTime();
    this.reocurrance = 0;

    if (value) {
      this.value = value;
    }
  }

  static matches(value: any): boolean {
    return RECURRING_RANDOMIZED_TIMER_REGEX.test(value);
  }

  set value(value: TimeValue) {
    if (value instanceof RecurringRandomizedTimer) {
      // Re-enter
      this.value = value.toString();
    } else {
      const parsed = RECURRING_RANDOMIZED_TIMER_REGEX.exec(value);

      if (parsed) {
        const time = this.time;
        // @ts-ignore
        time.hours = parsed.groups.hours;
        // @ts-ignore
        time.minutes = parsed.groups.minutes;
        // @ts-ignore
        time.seconds = parsed.groups.seconds;

        const random = this.random;
        // @ts-ignore
        random.hours = parsed.groups.randomhours;
        // @ts-ignore
        random.minutes = parsed.groups.randomminutes;
        // @ts-ignore
        random.seconds = parsed.groups.randomseconds;
        // @ts-ignore
        this.reoccurs(parsed.groups.times.length === 0 ? 0 : parsed.groups.times);
      } else {
        throw new HueBridgeModelError(`Cannot create a RandomizedTimer from ${value}`);
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

  reoccurs(value?: TimeComponentValue) {
    // @ts-ignore
    this.reocurrance = REOCCURRANCE_ATTRIBUTE.getValue(value);
    return this;
  }

  toString(): string {
    let limit = '';

    const reoccurs = this.reocurrance;
    if (reoccurs !== 0) {
      limit = `${reoccurs}`.padStart(2, '0');
    }

    return `R${limit}/PT${this.time.toString()}A${this.random.toString()}`;
  }
}