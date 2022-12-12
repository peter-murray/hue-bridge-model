import { BooleanType, ChoiceType, Int16Type, ListType, StringType, UInt8Type } from '../../types';
import { Sensor } from './Sensor';

const CONFIG_ATTRIBUTES = [
  new BooleanType({name: 'reachable'}),
  new UInt8Type({name: 'battery'}),
  new ChoiceType({name: 'alert', validValues: ['none', 'select', 'lselect'], defaultValue: 'none'}),
  new ListType({name: 'pending', entryType: new StringType({name: 'pendingChange'}), minEntries: 0})
];

const STATE_ATTRIBUTES = [
  new Int16Type({name: 'rotaryevent'}),
  new Int16Type({name: 'expectedrotation'}),
  new Int16Type({name: 'expectedeventduration'}),
];

// Hue Tap Dial Switch
export class ZLLRelativeRotary extends Sensor {

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

  get pending(): string {
    return this.getConfigAttributeValue('pending');
  }

  get buttonevent(): number {
    return this.getStateAttributeValue('buttonevent');
  }
}