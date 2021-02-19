import { BridgeAction } from './BridgeAction';
import { ObjectType, StringType } from '../../types';
import { Scene } from '../scenes/Scene';
import { HueBridgeModelError } from '../../HueBridgeModelError';

const ATTRIBUTES = [
  new StringType({name: 'scene'}),
  new ObjectType({name: 'body'}),
  new ObjectType({name: 'state'}),
];

export class SceneAction extends BridgeAction {

  constructor(scene: Scene | string) {
    super(ATTRIBUTES, 'PUT');
    this.withScene(scene);
  }

  get address(): string {
    return `/scenes/${this.scene}`;
  }

  get scene(): string {
    return this.getAttributeValue('scene');
  }

  withScene(value: Scene | string) {
    if (value instanceof Scene) {
      this.setAttributeValue('scene', value.id);
    } else {
      this.setAttributeValue('scene', value);
    }
  }

  withState(data: object) {
    // Sensor state varies wildly, so just take data here, maybe consider building payloads later on...
    this.setAttributeValue('state', data);
    return this;
  }

  get body(): object {
    const state = this.getAttributeValue('state');
    if (state) {
      return state;
    }
    throw new HueBridgeModelError('No state has been set on the SceneAction');
  }
};
