import { getTimePattern } from './timeUtil';
import { HueBridgeModelError } from '../HueBridgeModelError';
import { AttributeObject } from '../AttributeObject';
import { UInt8Type } from '../types/UInt8Type';

const ATTRIBUTES = [
  new UInt8Type({name: 'hours', min: 0, max: 23}),
  new UInt8Type({name: 'minutes', min: 0, max: 59}),
  new UInt8Type({name: 'seconds', min: 0, max: 59}),
];

const TIME_REGEX = new RegExp(getTimePattern());

export type NumericalValue = number | string


export class HueTime extends AttributeObject {

  constructor(time?: Date | string) {
    super(ATTRIBUTES);

    if (time instanceof Date) {
      this.fromDate(time);
    } else {
      this.fromString(time || '00:00:00');
    }
  }

  get hours(): NumericalValue {
    return this.getAttributeValue('hours');
  }

  get hoursString(): string {
    return `${this.hours}`.padStart(2, '0');
  }

  set hours(value: NumericalValue) {
    this.setAttributeValue('hours', value);
  }

  get minutes(): NumericalValue {
    return this.getAttributeValue('minutes');
  }

  get minutesString() {
    return `${this.minutes}`.padStart(2, '0');
  }

  set minutes(value: NumericalValue) {
    this.setAttributeValue('minutes', value);
  }

  get seconds(): NumericalValue {
    return this.getAttributeValue('seconds');
  }

  get secondsString(): string {
    return `${this.seconds}`.padStart(2, '0');
  }

  set seconds(value: NumericalValue) {
    this.setAttributeValue('seconds', value);
  }

  toString(): string {
    return `${this.hoursString}:${this.minutesString}:${this.secondsString}`;
  }

  fromString(value: string) {
    const parsed = TIME_REGEX.exec(value);

    if (parsed) {
      // @ts-ignore
      this.hours = parsed.groups.hours;
      // @ts-ignore
      this.minutes = parsed.groups.minutes;
      // @ts-ignore
      this.seconds = parsed.groups.seconds;
    } else {
      throw new HueBridgeModelError(`Invalid time format string "${value}"`);
    }
  }

  fromDate(value: Date) {
    this.hours = value.getUTCHours();
    this.minutes = value.getMinutes();
    this.seconds = value.getSeconds();
  }
};

