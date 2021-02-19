import { CLIPSensor } from './CLIPSensor';
import { BaseType, BooleanType } from '../../types';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'flag'}),
];

export class CLIPGenericFlag extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get flag(): boolean {
    return this.getStateAttributeValue('flag');
  }

  set flag(value) {
    this._updateStateAttributeValue('flag', value);
  }
}