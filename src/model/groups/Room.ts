import { Group } from './Group';
import { ChoiceType, ListType, StringType } from '../../types';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Room'}),
  new ChoiceType({name: 'class', defaultValue: 'Other', validValues: Group.getAllGroupClasses()}),
  new ListType({name: 'lights', minEntries: 0, entryType: new StringType({name: 'lightId'})}),
];

export class Room extends Group {

  constructor(id?: number | string) {
    super(ATTRIBUTES, id);
  }

  get lights() : string[] {
    return this.getAttributeValue('lights');
  }

  set lights(value) {
    this.setAttributeValue('lights', value);
  }

  set class(value: string) {
    this.setAttributeValue('class', value);
  }

  get class(): string {
    return this.getAttributeValue('class');
  }
}