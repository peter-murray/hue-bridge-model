import BooleanType from '../../types/BooleanType';
import Sensor from './Sensor';

const CONFIG_ATTRIBUTES = [
    new BooleanType({name: 'reachable'}),
  ]
  , STATE_ATTRIBUTES = [
    new BooleanType({name: 'presence'})
  ]
;

export default class Daylight extends Sensor {

  constructor(id: number | string) {
    super(CONFIG_ATTRIBUTES, STATE_ATTRIBUTES, id);
  }

  get presence(): boolean {
    return this.getStateAttributeValue('presence');
  }
};