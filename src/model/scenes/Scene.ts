import { BooleanType, ChoiceType, Int8Type, ObjectType, StringType, BaseType } from '../../types';
import { BridgeObjectWithId } from '../BridgeObjectWithId';

const ATTRIBUTES = [
  new StringType({name: 'id', minLength: 1, maxLength: 16}),
  new StringType({name: 'name', minLength: 1, maxLength: 32}),
  new ChoiceType({name: 'type', validValues: ['LightScene', 'GroupScene'], defaultValue: 'LightScene'}),
  new StringType({name: 'owner'}),
  new BooleanType({name: 'recycle', defaultValue: false}),
  new BooleanType({name: 'locked'}),
  new ObjectType({name: 'appdata', types: [new Int8Type({name: 'version'}), new StringType({name: 'data', minLength: 1, maxLength: 16, optional: true})]}),
  new StringType({name: 'picture', minLength: 0, maxLength: 16}),
  new StringType({name: 'lastupdated'}), //TODO this is a time stamp but it can be treated as a string here
  new Int8Type({name: 'version'}),
];

type AppData = {
  version: number
  data: string
}

export class Scene extends BridgeObjectWithId {

  constructor(attributes: BaseType<any>[], type: string, id?: number | string) {
    super([...ATTRIBUTES, ...attributes], id);

    this.setAttributeValue('type', type);
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  set name(value: string) {
    this.setAttributeValue('name', value)
  }

  get type(): string {
    return this.getAttributeValue('type');
  }

  get owner(): string {
    return this.getAttributeValue('owner');
  }

  get recycle(): boolean {
    return this.getAttributeValue('recycle');
  }

  set recycle(value: boolean) {
    this.setAttributeValue('recycle', value);
  }

  get locked(): boolean {
    return this.getAttributeValue('locked');
  }

  get appdata(): AppData {
    return this.getAttributeValue('appdata');
  }

  set appdata(value) {
    this.setAttributeValue('appdata', value);
  }

  set picture(value: string) {
    this.setAttributeValue('picture', value);
  }

  get picture(): string {
    return this.getAttributeValue('picture');
  }

  get lastupdated(): string {
    return this.getAttributeValue('lastupdated');
  }

  get version(): number {
    return this.getAttributeValue('version');
  }
}