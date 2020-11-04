import Group from './Group';
import StringType from '../../types/StringType';
import ListType from '../../types/ListType';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Luminaire'}),
  new ListType({name: 'lights', minEntries: 1, entryType: new StringType({name: 'lightId'})}),
];

export default class Luminaire extends Group {

  constructor(id?: string | number) {
    super(ATTRIBUTES, id);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }
};