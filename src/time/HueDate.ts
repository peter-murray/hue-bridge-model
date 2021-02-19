import { getDatePattern } from './timeUtil';
import { HueBridgeModelError } from '../HueBridgeModelError';
import { AttributeObject } from '../AttributeObject';
import { UInt8Type } from '../types/UInt8Type';
import { ChoiceType } from '../types/ChoiceType';


const DATE_STRING_REGEX = new RegExp(`^${getDatePattern()}`);

const MONTHS = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


const ATTRIBUTES = [
  new UInt8Type({name: 'year', min: 1900, max: 3000}),
  new ChoiceType({name: 'month', validValues: MONTHS}),
  new UInt8Type({name: 'day', min: 0, max: 31}),
];

export type NumericalValue = number | string

export class HueDate extends AttributeObject {

  constructor(value?: Date | string) {
    super(ATTRIBUTES);

    if (value instanceof Date) {
      this.fromDate(value);
    } else {
      this.fromString(value);
    }
  }

  get year(): NumericalValue {
    return this.getAttributeValue('year');
  }

  get yearString(): string {
    return `${this.year}`;
  }

  set year(value: NumericalValue) {
    this.setAttributeValue('year', value);
  }

  get month(): NumericalValue {
    const idx = MONTHS.indexOf(this.getAttributeValue('month'));

    //TODO make mandatory then will not need this?
    if (idx === -1) {
      throw new HueBridgeModelError(`Month value has not been set`);
    }

    return idx + 1;
  }

  get monthString(): string {
    const month = this.month;
    return `${month}`.padStart(2, '0');
  }

  /**
   * Sets the Month for the Date.
   * @param value {number | string} If a number, it is a 1 based index on the month number (1 === Jan), otherwise as a String the name of the month.
   * @returns {BridgeObject}
   */
  set month(value: NumericalValue) {
    const monthNumber: number = parseInt(`${value}`);

    if (Number.isNaN(monthNumber)) {
      this.setAttributeValue('month', value);
    } else {
      const monthName: string = MONTHS[monthNumber - 1];
      this.setAttributeValue('month', monthName);
    }
  }

  get day(): NumericalValue {
    return this.getAttributeValue('day');
  }

  get dayString(): string {
    return `${this.day}`.padStart(2, '0');
  }

  set day(value: NumericalValue) {
    this.setAttributeValue('day', value);
  }

  toString(): string {
    return `${this.yearString}-${this.monthString}-${this.dayString}`;
  }

  fromString(value?: string): HueDate {
    if (!value) {
      return this.fromDate(new Date());
    } else {
      const parsed = DATE_STRING_REGEX.exec(value);
      if (parsed) {
        // @ts-ignore
        this.year = parsed.groups.year;
        // @ts-ignore
        this.month = parsed.groups.month;
        // @ts-ignore
        this.day = parsed.groups.day;

        return this;
      }
      return this.fromDate(new Date());
    }
  }

  fromDate(value: Date): HueDate {
    this.year = value.getUTCFullYear();
    this.month = value.getUTCMonth() + 1;
    this.day = value.getUTCDate();

    return this;
  }
}