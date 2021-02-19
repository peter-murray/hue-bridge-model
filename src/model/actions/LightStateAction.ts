import { ObjectType, UInt8Type } from '../../types';
import { BridgeAction } from './BridgeAction';
import { LightState } from '../lightstate/LightState';
import { Light } from '../Light';
import { HueBridgeModelError } from '../../HueBridgeModelError';

const ATTRIBUTES = [
  new UInt8Type({name: 'light'}),
  new ObjectType({name: 'body'}),
  new ObjectType({name: 'state'}), //TODO this is an actual LightState object, could utilize another type
];

export class LightStateAction extends BridgeAction {

  constructor(light: Light | string | number) {
    super(ATTRIBUTES, 'PUT');
    this.light = light;
  }

  get address() {
    return `/lights/${this.light}/state`;
  }

  get light() {
    return this.getAttributeValue('light');
  }

  set light(value: Light | string | number) {
    if (value instanceof Light) {
      this.setAttributeValue('light', value.id);
    } else {
      this.setAttributeValue('light', value);
    }
  }

  withState(state: LightState | object) {
    let value: LightState;

    if (state instanceof LightState) {
      value = state;
    } else {
      value = new LightState().populate(state);
    }

    this.setAttributeValue('state', value.getPayload());
    return this;
  }

  get body() {
    const state = this.getAttributeValue('state');
    if (state) {
      return state;
    }
    throw new HueBridgeModelError('No state has been set on the LightStateAction');
  }
};
