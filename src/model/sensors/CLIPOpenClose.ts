import { CLIPSensor } from './CLIPSensor';
import { BaseType, BooleanType } from '../../types';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'open'})
];

export class CLIPOpenClose extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get open(): boolean {
    return this.getStateAttributeValue('open');
  }

  set open(value) {
    this._updateStateAttributeValue('open', value);
  }
}