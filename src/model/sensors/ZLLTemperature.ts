import Int16Type from '../../types/Int16Type';
import Sensor from './Sensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new Int16Type({name: 'temperature'}),
];

export default class ZLLTemperature extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get temperature(): number {
    return this.getStateAttributeValue('temperature');
  }
};