import { CommonStates } from './CommonStates';

export class GroupState extends CommonStates<GroupState> {

  constructor() {
    super(['scene']);
  }

  scene(value: string): GroupState {
    return this._setStateValue('scene', value);
  }
}