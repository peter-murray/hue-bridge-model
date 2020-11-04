import UInt16Type from '../../types/UInt16Type';
import CLIPSensor from './CLIPSensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'status'}),
];

export default class CLIPGenericStatus extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get status() {
    return this.getStateAttributeValue('status');
  }

  set status(value) {
    this._updateStateAttributeValue('status', value);
  }
};