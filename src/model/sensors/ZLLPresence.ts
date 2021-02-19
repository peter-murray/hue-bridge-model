import { BooleanType, ChoiceType, UInt16Type, UInt8Type } from '../../types';
import { Sensor } from './Sensor';

const CONFIG_ATTRIBUTES = [
  new UInt8Type({name: 'battery'}),
  new ChoiceType({name: 'alert', validValues: ['none', 'select', 'lselect'], defaultValue: 'none'}),
  new BooleanType({name: 'reachable'}),
  new UInt16Type({name: 'sensitivity'}),
  new UInt16Type({name: 'sensitivitymax'}),
];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'presence'}),
];

// Hue Motion Sensor
export class ZLLPresence extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get battery(): number {
    return this.getConfigAttributeValue('battery');
  }

  set battery(value) {
    this._updateConfigAttributeValue('battery', value);
  }

  get alert(): string {
    return this.getConfigAttributeValue('alert');
  }

  set alert(value) {
    this._updateConfigAttributeValue('alert', value);
  }

  get reachable(): boolean {
    return this.getConfigAttributeValue('reachable');
  }

  set reachable(value) {
    this._updateConfigAttributeValue('reachable', value);
  }

  get sensitivity(): number {
    return this.getConfigAttributeValue('sensitivity');
  }

  set sensitivity(value) {
    this._updateConfigAttributeValue('sensitivity', value);
  }

  get sensitivitymax() : number{
    return this.getConfigAttributeValue('sensitivitymax');
  }

  set sensitivitymax(value) {
    this._updateConfigAttributeValue('sensitivitymax', value);
  }

  get presence(): boolean {
    return this.getStateAttributeValue('presence');
  }
}