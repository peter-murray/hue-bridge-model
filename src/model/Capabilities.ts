import { ObjectType, UInt16Type, ListType, StringType } from '../types';
import { BridgeObject } from './BridgeObject';

const ATTRIBUTES = [
  new ObjectType({
    name: 'lights',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
    ]
  }),
  new ObjectType({
    name: 'sensors',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
      new ObjectType({
        name: 'clip',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      }),
      new ObjectType({
        name: 'zll',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      }),
      new ObjectType({
        name: 'zgp',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      })
    ]
  }),
  new ObjectType({
    name: 'groups',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
    ]
  }),
  new ObjectType({
    name: 'scenes',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
      new ObjectType({
        name: 'lightstates',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      }),
    ]
  }),
  new ObjectType({
    name: 'schedules',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
    ]
  }),
  new ObjectType({
    name: 'rules',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
      new ObjectType({
        name: 'conditions',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      }),
      new ObjectType({
        name: 'actions',
        types: [
          new UInt16Type({name: 'available'}),
          new UInt16Type({name: 'total'}),
        ]
      }),
    ]
  }),
  new ObjectType({
    name: 'resourcelinks',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
    ]
  }),
  new ObjectType({
    name: 'streaming',
    types: [
      new UInt16Type({name: 'available'}),
      new UInt16Type({name: 'total'}),
      new UInt16Type({name: 'channels'}),
    ]
  }),
  new ObjectType({
    name: 'timezones',
    types: [
      new ListType({name: 'values', minEntries: 0, entryType: new StringType({name: 'timezone'})}),
    ]
  }),
];

type AvailableTotalSummary = {
  available: number,
  total: number
}

type SensorsAvailableTotalSummary = {
  clip: AvailableTotalSummary,
  zll: AvailableTotalSummary,
  zgp: AvailableTotalSummary
} & AvailableTotalSummary

type ScenesAvailableTotalSummary = {
  lightstates: AvailableTotalSummary
} & AvailableTotalSummary

type RulesAvailableTotalSummary = {
  conditions: AvailableTotalSummary,
  actions: AvailableTotalSummary
} & AvailableTotalSummary

type Streaming = {
  channels: number
} & AvailableTotalSummary

export class Capabilities extends BridgeObject {

  constructor() {
    super(ATTRIBUTES);
  }

  get lights(): AvailableTotalSummary {
    return this.getAttributeValue('lights');
  }

  get sensors():SensorsAvailableTotalSummary {
    return this.getAttributeValue('sensors');
  }

  get groups():AvailableTotalSummary {
    return this.getAttributeValue('groups');
  }

  get scenes(): ScenesAvailableTotalSummary {
    return this.getAttributeValue('scenes');
  }

  get schedules(): AvailableTotalSummary {
    return this.getAttributeValue('schedules');
  }

  get rules(): RulesAvailableTotalSummary {
    return this.getAttributeValue('rules');
  }

  get resourceLinks(): AvailableTotalSummary {
    return this.getAttributeValue('resourcelinks');
  }

  get resourcelinks() : AvailableTotalSummary{
    return this.getAttributeValue('resourcelinks');
  }

  get streaming(): Streaming {
    return this.getAttributeValue('streaming');
  }

  get timezones(): string[] {
    return this.getAttributeValue('timezones').values;
  }
};