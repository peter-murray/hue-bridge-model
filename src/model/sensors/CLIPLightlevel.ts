import { CLIPSensor } from './CLIPSensor';
import { BooleanType, UInt16Type } from '../../types';

const CONFIG_ATTRIBUTES = [
  new UInt16Type({name: 'tholddark', defaultValue: 16000}),
  new UInt16Type({name: 'tholdoffset', min: 1, defaultValue: 7000}),
];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'lightlevel'}),
  new BooleanType({name: 'dark'}),
  new BooleanType({name: 'daylight'}),
];

export class CLIPLightlevel extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get tholddark(): number {
    return this.getConfigAttributeValue('tholddark');
  }

  set tholddark(value) {
    this._updateConfigAttributeValue('tholddark', value);
  }

  get thresholdDark(): number {
    return this.tholddark;
  }

  get tholdoffset(): number {
    return this.getConfigAttributeValue('tholdoffset');
  }

  set tholdoffset(value) {
    this._updateConfigAttributeValue('tholdoffset', value);
  }

  get thresholdOffset(): number {
    return this.tholdoffset;
  }

  get lightlevel(): number {
    return this.getStateAttributeValue('lightlevel');
  }

  set lightlevel(value) {
    this._updateStateAttributeValue('lightlevel', value);
  }

  get dark(): boolean {
    return this.getStateAttributeValue('dark');
  }

  set dark(value) {
    this._updateStateAttributeValue('dark', value);
  }

  get daylight(): boolean {
    return this.getStateAttributeValue('daylight');
  }

  set daylight(value) {
    this._updateStateAttributeValue('daylight', value);
  }
}