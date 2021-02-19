import { ObjectType, Int8Type } from '../../types';
import { BridgeAction } from './BridgeAction';
import { Group } from '../groups/Group';
import { GroupState } from '../lightstate/GroupState';
import { HueBridgeModelError } from '../../HueBridgeModelError';

const ATTRIBUTES = [
  new Int8Type({name: 'group'}),
  new ObjectType({name: 'state'}), //TODO this is an actual GroupState object
];

export class GroupStateAction extends BridgeAction {

  constructor(group: Group | number | string) {
    super(ATTRIBUTES, 'PUT');
    this.withGroup(group);
  }

  get address(): string {
    return `/groups/${this.group}/action`;
  }

  get group(): number {
    return this.getAttributeValue('group');
  }

  withGroup(value: Group | number | string) {
    if (value instanceof Group) {
      this.setAttributeValue('group', value.id);
    } else {
      this.setAttributeValue('group', value);
    }
  }

  withState(state: GroupState | object) {
    let value: GroupState;

    if (state instanceof GroupState) {
      value = state;
    } else {
      value = new GroupState().populate(state);
    }

    this.setAttributeValue('state', value.getPayload());
    return this;
  }

  get body() {
    const state = this.getAttributeValue('state');
    if (state) {
      return state;
    }
    throw new HueBridgeModelError('No state has been set on the GroupStateAction');
  }
};
