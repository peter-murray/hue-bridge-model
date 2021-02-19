import { BaseType, UInt16Type } from '../../types';
import { Sensor } from './Sensor';

const CONFIG_ATTRIBUTES: BaseType<any>[] = [];

const STATE_ATTRIBUTES = [
  new UInt16Type({name: 'buttonevent'})
];


// Hue Tap Switch - Zigbee Green Power Switch
export class ZGPSwitch extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get buttonevent() {
    return this.getStateAttributeValue('buttonevent');
  }

  // //TODO not sure that we can actually set these, create a test to see
  // set buttonevent(value) {
  //   // Bridge does nto enforce these values, but the following correspond to each of the 4 buttons on the Hue Tap
  //   if (value === 34 || value === 16 || value === 17 || value === 18) {
  //     this._updateStateAttribute('buttoneevent', value);
  //     return this;
  //   } else {
  //     //TODO
  //     throw new ApiError('Unsupported value as per Hue documentation, https://developers.meethue.com/develop/hue-api/supported-devices');
  //   }
  // }
}