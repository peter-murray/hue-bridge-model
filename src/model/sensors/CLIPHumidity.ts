import { UInt16Type, BaseType } from '../../types';
import { CLIPSensor } from './CLIPSensor';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'humidity'}),
];

export class CLIPHumidity extends CLIPSensor {

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
}