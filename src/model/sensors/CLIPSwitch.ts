import { CLIPSensor } from './CLIPSensor';
import { BaseType, UInt16Type } from '../../types';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'buttonevent'}),
];

export class CLIPSwitch extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get buttonevent(): number {
    return this.getStateAttributeValue('buttonevent');
  }

  set buttonevent(value) {
    this._updateStateAttributeValue('buttonevent', value);
  }
}