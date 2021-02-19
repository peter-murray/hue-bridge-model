import { BridgeObjectId, BridgeObjectWithId } from './BridgeObjectWithId';
import {StringType, UInt8Type, ObjectType, BooleanType, ChoiceType, TimePatternType} from '../types';

const ATTRIBUTES = [
  new UInt8Type({name: 'id'}),
  new StringType({name: 'name', minLength: 0, maxLength: 32, optional: true}),
  new StringType({name: 'description', minLength: 0, maxLength: 64, optional: true}),
  new ObjectType({
    name: 'command',
    optional: false,
    types: [
      new StringType({name: 'address', optional: false}),
      new ChoiceType({name: 'method', optional: false, validValues: ['POST', 'PUT', 'DELETE']}),
      new ObjectType({name: 'body', optional: false}),
    ],
  }),
  new StringType({name: 'time'}),
  new TimePatternType({name: 'localtime'}),
  new StringType({name: 'created'}),
  new ChoiceType({name: 'status', validValues: ['enabled', 'disabled'], defaultValue: 'enabled'}),
  new BooleanType({name: 'autodelete'}),
  new BooleanType({name: 'recycle', defaultValue: false}),
  new StringType({name: 'starttime'}),
];


export class Schedule extends BridgeObjectWithId {

  constructor(id?: BridgeObjectId) {
    super(ATTRIBUTES, id);
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  set name(value) {
    this.setAttributeValue('name', value);
  }

  get description(): string {
    return this.getAttributeValue('description');
  }

  set description(value) {
    this.setAttributeValue('description', value);
  }

  get command(): string {
    return this.getAttributeValue('command');
  }

  set command(value) {
    this.setAttributeValue('command', value);
  }

  get time() {
    return this.getAttributeValue('time');
  }

  get localtime() {
    return this.getAttributeValue('localtime');
  }

  set localtime(value) {
    this.setAttributeValue('localtime', value);
  }

  get status(): string {
    return this.getAttributeValue('status');
  }

  set status(value) {
    this.setAttributeValue('status', value);
  }

  get autodelete(): boolean {
    return this.getAttributeValue('autodelete');
  }

  set autodelete(value) {
    this.setAttributeValue('autodelete', value);
  }

  get recycle(): boolean {
    return this.getAttributeValue('recycle');
  }

  set recycle(value) {
    this.setAttributeValue('recycle', value);
  }

  get created(): string {
    return this.getAttributeValue('created');
  }
}