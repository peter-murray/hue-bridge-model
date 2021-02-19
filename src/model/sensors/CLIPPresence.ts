import { BaseType, BooleanType } from '../../types';
import { CLIPSensor } from './CLIPSensor';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'presence'}),
];

export class CLIPPresence extends CLIPSensor {

  constructor(id?: string | number) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get presence(): boolean {
    return this.getStateAttributeValue('presence');
  }

  set presence(value) {
    this._updateStateAttributeValue('presence', value);
  }
}