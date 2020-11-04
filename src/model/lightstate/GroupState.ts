import CommonStates from './CommonStates';

export default class GroupState extends CommonStates {

  constructor() {
    super(['scene']);
  }

  scene(value: string) {
    return this._setStateValue('scene', value);
  }
};