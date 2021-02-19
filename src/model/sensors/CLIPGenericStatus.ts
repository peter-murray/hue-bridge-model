import { BaseType, UInt16Type } from '../../types';
import { CLIPSensor } from './CLIPSensor';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'status'}),
];

export class CLIPGenericStatus extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get status() {
    return this.getStateAttributeValue('status');
  }

  set status(value) {
    this._updateStateAttributeValue('status', value);
  }
}