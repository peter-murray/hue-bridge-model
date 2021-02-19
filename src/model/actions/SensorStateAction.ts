import { ObjectType, UInt8Type } from '../../types';
import { BridgeAction } from './BridgeAction';
import { Sensor } from '../sensors/Sensor';
import { HueBridgeModelError } from '../../HueBridgeModelError';

const ATTRIBUTES = [
  new UInt8Type({name: 'sensor'}),
  new ObjectType({name: 'body'}),
  new ObjectType({name: 'state'}),
];

export class SensorStateAction extends BridgeAction {

  constructor(sensor: Sensor | number | string) {
    super(ATTRIBUTES, 'PUT');
    this.withSensor(sensor);
  }

  get address(): string {
    return `/sensors/${this.sensor}/state`;
  }

  get sensor(): number {
    return this.getAttributeValue('sensor');
  }

  withSensor(value: Sensor | number| string) {
    if (value instanceof Sensor) {
      this.setAttributeValue('sensor', value.id);
    } else {
      this.setAttributeValue('sensor', value);
    }
  }

  withState(value: object) {
    // Sensor state varies wildly, so just take data here, maybe consider building payloads later on...
    this.setAttributeValue('state', value);
    return this;
  }

  get body() {
    const state = this.getAttributeValue('state');
    if (state) {
      return state;
    }
    throw new HueBridgeModelError('No state has been set on the SensorStateAction');
  }
}
