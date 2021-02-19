import { BooleanType } from '../../types';
import { Sensor } from './Sensor';

const CONFIG_ATTRIBUTES = [
    new BooleanType({name: 'reachable'}),
  ]
  , STATE_ATTRIBUTES = [
    new BooleanType({name: 'presence'})
  ]
;

export class GeoFence extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get presence(): boolean {
    return this.getStateAttributeValue('presence');
  }
}