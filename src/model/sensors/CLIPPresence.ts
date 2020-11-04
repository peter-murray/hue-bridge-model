import BooleanType from '../../types/BooleanType';
import CLIPSensor from './CLIPSensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new BooleanType({name: 'presence'}),
];

export default class CLIPPresence extends CLIPSensor {

  constructor(id?: string | number) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get presence(): boolean {
    return this.getStateAttributeValue('presence');
  }

  set presence(value) {
    this._updateStateAttributeValue('presence', value);
  }
};