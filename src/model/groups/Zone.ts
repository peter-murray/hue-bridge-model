import Group from './Group';
import StringType from '../../types/StringType';
import ListType from '../../types/ListType';
import ChoiceType from '../../types/ChoiceType';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Zone'}),
  new ChoiceType({name: 'class', defaultValue: 'Other', validValues: Group.getAllGroupClasses()}),
  new ListType({name: 'lights', minEntries: 0, entryType: new StringType({name: 'lightId'})}),
];


export default class Zone extends Group {

  constructor(id?: string | number) {
    super(ATTRIBUTES, id);
  }

  get lights(): string[] {
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
};