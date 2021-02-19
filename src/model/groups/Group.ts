import { BaseType, BooleanType, Int8Type, ListType, ObjectType, StringType, UInt16Type } from '../../types';
import { BridgeObjectWithId } from '../BridgeObjectWithId';
import { HueBridgeModelError } from '../../HueBridgeModelError';

const ROOM_CLASSES = [
  'Living room',
  'Kitchen',
  'Dining',
  'Bedroom',
  'Kids bedroom',
  'Bathroom',
  'Nursery',
  'Recreation',
  'Office',
  'Gym',
  'Hallway',
  'Toilet',
  'Front door',
  'Garage',
  'Terrace',
  'Garden',
  'Driveway',
  'Carport',
  'Other',
  // The following are valid in 1.30 and higher of the API
  'Home',
  'Downstairs',
  'Upstairs',
  'Top floor',
  'Attic',
  'Guest room',
  'Staircase',
  'Lounge',
  'Man cave',
  'Computer',
  'Studio',
  'Music',
  'TV',
  'Reading',
  'Closet',
  'Storage',
  'Laundry room',
  'Balcony',
  'Porch',
  'Barbecue',
  'Pool',
];


const ATTRIBUTES = [
  new Int8Type({name: 'id'}),
  new StringType({name: 'name', minLength: 0, maxLength: 32}),
  new ListType({name: 'sensors', minEntries: 0, entryType: new StringType({name: 'sensorId'})}),
  new ObjectType({name: 'action'}), //TODO a lightstate
  new ObjectType({
    name: 'state',
    types: [
      new BooleanType({name: 'all_on'}),
      new BooleanType({name: 'any_on'}),
    ]
  }),
  // Only present if the group contains a ZLLPresence or CLIPPresence
  new ObjectType({
    name: 'presence',
    types: [
      new StringType({name: 'lastupdated'}),
      new BooleanType({name: 'presence'}),
      new BooleanType({name: 'presence_all'})
    ]
  }),
  // Only present if the group contains a ZLLLightlevel or CLIPLightLevel
  new ObjectType({
    name: 'lightlevel', types: [
      new StringType({name: 'lastupdated'}),
      new BooleanType({name: 'dark'}),
      new BooleanType({name: 'dark_all'}),
      new BooleanType({name: 'daylight'}),
      new BooleanType({name: 'daylight_any'}),
      new UInt16Type({name: 'lightlevel'}),
      new UInt16Type({name: 'lightlevel_min'}),
      new UInt16Type({name: 'lightlevel_max'}),
    ]
  }),
  new BooleanType({name: 'recycle', defaultValue: false}),
];

export class Group extends BridgeObjectWithId {

  constructor(attributes: BaseType<any>[], id?: string | number) {
    super([...ATTRIBUTES, ...attributes], id);

    if (!this.attributes.type) {
      throw new HueBridgeModelError('Missing a valid type attribute for the Group');
    }

    if (!this.attributes.lights) {
      throw new HueBridgeModelError('Missing a valid lights attribute for the Group');
    }
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  set name(value) {
    this.setAttributeValue('name', value);
  }

  set sensors(value: string[]) {
    this.setAttributeValue('sensors', value);
  }

  get sensors(): string[] {
    return this.getAttributeValue('sensors');
  }

  get type(): string {
    return this.getAttributeValue('type');
  }

  get action(): Object {
    // //TODO this is a lightstate
    // return this.getRawDataValue('action');
    return this.getAttributeValue('action');
  }

  get recycle(): boolean {
    return this.getAttributeValue('recycle');
  }

  get state(): Object {
    return this.getAttributeValue('state');
  }

  static getAllGroupClasses(): string[] {
    return ROOM_CLASSES;
  }
}