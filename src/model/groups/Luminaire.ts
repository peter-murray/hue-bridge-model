import { Group } from './Group';
import { ListType, StringType } from '../../types';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Luminaire'}),
  new ListType({name: 'lights', minEntries: 1, entryType: new StringType({name: 'lightId'})}),
];

export class Luminaire extends Group {

  constructor(id?: string | number) {
    super(ATTRIBUTES, id);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }
}