import CLIPSensor from './CLIPSensor';
import BooleanType from '../../types/BooleanType';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'open'})
];

export default class CLIPOpenClose extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get open(): boolean {
    return this.getStateAttributeValue('open');
  }

  set open(value) {
    this._updateStateAttributeValue('open', value);
  }
};