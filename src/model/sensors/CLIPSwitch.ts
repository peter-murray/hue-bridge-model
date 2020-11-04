import CLIPSensor from './CLIPSensor';
import UInt16Type from '../../types/UInt16Type';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'buttonevent'}),
];

export default class CLIPSwitch extends CLIPSensor {

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