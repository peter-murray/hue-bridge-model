import UInt16Type from '../../types/UInt16Type';
import CLIPSensor from './CLIPSensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'temperature'}),
];

export default class CLIPTemperature extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get temperature(): number {
    return this.getStateAttributeValue('temperature');
  }

  set temperature(value) {
    this._updateStateAttributeValue('temperature', value);
  }
};