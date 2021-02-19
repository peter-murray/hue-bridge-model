import { BaseType, Int16Type } from '../../types';
import { Sensor } from './Sensor';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new Int16Type({name: 'temperature'}),
];

export class ZLLTemperature extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get temperature(): number {
    return this.getStateAttributeValue('temperature');
  }
}