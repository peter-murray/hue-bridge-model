import { BridgeAction } from './BridgeAction';
import { HueBridgeModelError } from '../../HueBridgeModelError';

export class ScheduleStateAction extends BridgeAction {

  private id?: string | number;

  private _state?: object;

  constructor(id?: string | number) {
    super([], 'PUT');
    this.id = id;
  }

  get address() {
    if (this.id === null || this.id === undefined) {
      return '/schedules';
    }
    return `/schedules/${this.id}`;
  }

  withState(data: object) {
    // Schedule state not completely known at this time, so just take data here, maybe consider building payloads later on...
    this._state = data;
    return this;
  }

  get body() {
    if (this._state) {
      return this._state;
    }
    throw new HueBridgeModelError('No state has been set on the Rule Action');
  }
};
