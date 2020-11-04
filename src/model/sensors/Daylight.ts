import Sensor from './Sensor';
import StringType from '../../types/StringType';
import BooleanType from '../../types/BooleanType';
import Int8Type from '../../types/Int8Type';

const CONFIG_ATTRIBUTES = [
    new BooleanType({name: 'configured'}),
    new Int8Type({name: 'sunriseoffset', defaultValue: 30, min: -120, max: 120}),
    new Int8Type({name: 'sunsetoffset', defaultValue: -30, min: -120, max: 120}),
    new StringType({name: 'long'}), //TODO Can only set this, regex match required for this
    new StringType({name: 'lat'}), //TODO Can only set this
  ]
  , STATE_ATTRIBUTES = [
    new BooleanType({name: 'daylight'}),
    new StringType({name: 'lastupdated'}),
  ]
;

export default class Daylight extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  set long(value: string) {
    this._updateConfigAttributeValue('long', value);
  }

  set lat(value: string) {
    this._updateConfigAttributeValue('lat', value);
  }

  get configured(): boolean {
    return this.getConfigAttributeValue('configured');
  }

  get sunriseoffset(): number {
    return this.getConfigAttributeValue('sunriseoffset');
  }

  set sunriseoffset(value) {
    this._updateConfigAttributeValue('sunriseoffset', value);
  }

  get sunsetoffset() {
    return this.getConfigAttributeValue('sunsetoffset');
  }

  set sunsetoffset(value: number) {
    this._updateConfigAttributeValue('sunsetoffset', value);
  }

  get daylight(): boolean {
    return this.getStateAttributeValue('daylight');
  }

  set daylight(value) {
    this._updateStateAttributeValue('daylight', !!value);
  }
};