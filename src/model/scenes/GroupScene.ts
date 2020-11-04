import ObjectType from '../../types/ObjectType';
import ListType from '../../types/ListType';
import StringType from '../../types/StringType';
import Scene from './Scene';

const ATTRIBUTES = [
  new StringType({name: 'group'}),
  new ListType({name: 'lights', optional: true, minEntries: 1, entryType: new StringType({name: 'lightId'})}),
  new ObjectType({name: 'lightstates'}),
];

export default class GroupScene extends Scene {

  constructor(id?: string) {
    super(ATTRIBUTES, 'GroupScene', id);
  }

  get group(): string {
    return this.getAttributeValue('group');
  }

  set group(id) {
    this.setAttributeValue('group', id);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }

  get lightstates(): object {
    return this.getAttributeValue('lightstates');
  }
};