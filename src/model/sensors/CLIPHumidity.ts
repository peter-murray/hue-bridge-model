import UInt16Type from '../../types/UInt16Type';
import CLIPSensor from './CLIPSensor';
import Type from '../../types/Type';

const CONFIG_ATTRIBUTES: Type<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'humidity'}),
];

export default class CLIPHumidity extends CLIPSensor {

  constructor(id?: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get humidity() {
    return this.getStateAttributeValue('humidity');
  }

  set humidity(value) {
    //TODO	Current humidity 0.01% steps (e.g. 2000 is 20%)The bridge does not enforce range/resolution.
    this._updateStateAttributeValue('humidity', value);
  }
};