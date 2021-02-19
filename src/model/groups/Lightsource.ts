// TODO Do not have an example of this the API documentation is not correct as it refers to a standard LightGroup definition

import { Group } from './Group';
import { ListType, StringType } from '../../types';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Lightsource'}),
  new ListType({name: 'lights', minEntries: 1, entryType: new StringType({name: 'lightId'})}),
];

export class Lightsource extends Group {

  constructor(id?: string | number) {
    super(ATTRIBUTES, id);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }

  // TODO need to get one of these to test if we can set on it
  // set lights(value) {
  //   return this.setAttributeValue('lights', value);
  // }
}