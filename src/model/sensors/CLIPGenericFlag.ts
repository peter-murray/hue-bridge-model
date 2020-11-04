import CLIPSensor from './CLIPSensor';
import BooleanType from '../../types/BooleanType';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'flag'}),
];

export default class CLIPGenericFlag extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get flag(): boolean {
    return this.getStateAttributeValue('flag');
  }

  set flag(value) {
    this._updateStateAttributeValue('flag', value);
  }
};