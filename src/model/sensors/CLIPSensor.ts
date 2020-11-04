import BooleanType from '../../types/BooleanType';
import UInt8Type from '../../types/UInt8Type';
import StringType from '../../types/StringType';
import Sensor from './Sensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES = [
  new BooleanType({name: 'reachable'}),
  new UInt8Type({name: 'battery', optional: true}),
  new StringType({name: 'url', minLength: 0, maxLength: 64}),
];

export default class CLIPSensor extends Sensor {

  constructor(configAttributes: Type<any>[], stateAttributes: Type<any>[], id?: string | number) {
    super([...CONFIG_ATTRIBUTES, ...configAttributes], stateAttributes, id);
  }

  get reachable(): boolean {
    return this.getConfigAttributeValue('reachable');
  }

  set reachable(value) {
    this._updateConfigAttributeValue('reachable', value);
  }

  get battery(): number {
    return this.getConfigAttributeValue('battery');
  }

  set battery(value) {
    this._updateConfigAttributeValue('battery', value);
  }

  get url(): string {
    return this.getConfigAttributeValue('url');
  }

  set url(value) {
    this.setAttributeValue('url', value);
  }

  set modelid(value: string) {
    this.setAttributeValue('modelid', value);
  }

  set swversion(value: string) {
    this.setAttributeValue('swversion', value);
  }

  set uniqueid(value: string) {
    this.setAttributeValue('uniqueid', value);
  }

  set manufacturername(value: string) {
    this.setAttributeValue('manufacturername', value);
  }

  //TODO need to see where this is specified in the attributes
  get recycle(): boolean {
    return this.getAttributeValue('recycle');
  }
};