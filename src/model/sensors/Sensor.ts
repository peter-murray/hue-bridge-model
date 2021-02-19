import { BaseType, BooleanType, ObjectType, StringType, UInt8Type } from '../../types';
import { BridgeObjectWithId } from '../BridgeObjectWithId';

const COMMON_ATTRIBUTES = [
  new UInt8Type({name: 'id'}),
  new StringType({name: 'name'}),
  new StringType({name: 'type'}),
  new StringType({name: 'modelid'}),
  new StringType({name: 'manufacturername'}),
  new StringType({name: 'uniqueid'}),
  new StringType({name: 'swversion'}),
  new StringType({name: 'swconfigid'}), //TODO this is not present on many devices
  new ObjectType({name: 'capabilities'}),

  // TODO this is for zllswitch, need to check other z** sensors and refactor accordingly
  new StringType({name: 'productname'}),
  new ObjectType({name: 'swupdate'}),
  new StringType({name: 'diversityid'}),

  //TODO this is for CLIP, need to inject this in the constructor
  new BooleanType({name: 'recycle'}),
];

const COMMON_STATE_ATTRIBUTES = [
  new StringType({name: 'lastupdated', defaultValue: 'none'}),
];

const COMMON_CONFIG_ATTRIBUTES = [
  new BooleanType({name: 'on', defaultValue: true}),
];

type NameToType = {[key: string]: BaseType<any>}

export class Sensor extends BridgeObjectWithId {

  private _configAttributes: NameToType;

  private _stateAttributes: NameToType;

  //TODO consider removing data from here as we have _populate to do this
  constructor(configAttributes: BaseType<any>[], stateAttributes: BaseType<any>[], id?: string | number, data?: object) {
    const stateAttribute = new ObjectType({
        name: 'state',
        types: [...COMMON_STATE_ATTRIBUTES, ...stateAttributes]
      })
      , configAttribute = new ObjectType({
        name: 'config',
        types: [...COMMON_CONFIG_ATTRIBUTES, ...configAttributes]
      })
      , allAttributes: BaseType<any>[] = [...COMMON_ATTRIBUTES, stateAttribute, configAttribute]
    ;

    super(allAttributes, id);

    if (data) {
      this._populate(data);
    }

    // inject the name of the class as the type for the sensor
    this.setAttributeValue('type', this.constructor.name);

    this._configAttributes = {};
    // @ts-ignore
    configAttribute.types.forEach(attr => {
      this._configAttributes[attr.name] = attr;
    });

    this._stateAttributes = {};
    // @ts-ignore
    stateAttribute.types.forEach(attr => {
      this._stateAttributes[attr.name] = attr;
    });
  }

  set name(value) {
    this.setAttributeValue('name', value);
  }

  get name() {
    return this.getAttributeValue('name');
  }

  get modelid() {
    return this.getAttributeValue('modelid');
  }

  get manufacturername() {
    return this.getAttributeValue('manufacturername');
  }

  get swversion() {
    return this.getAttributeValue('swversion');
  }

  get swconfigid() {
    return this.getAttributeValue('swconfigid');
  }

  get type() {
    return this.getAttributeValue('type');
  }

  get uniqueid() {
    return this.getAttributeValue('uniqueid');
  }

  get capabilities() {
    return this.getAttributeValue('capabilities');
  }

  get lastupdated() {
    return this.getStateAttributeValue('lastupdated');
  }

  get on() {
    return this.getConfigAttributeValue('on');
  }

  set on(value) {
    this._updateConfigAttributeValue('on', value);
  }

  getConfig() {
    return this.getAttributeValue('config');
  }

  getConfigAttribute(name: string) {
    return this._configAttributes[name];
  }

  getStateAttribute(name: string) {
    return this._stateAttributes[name];
  }

  getStateAttributeNames() {
    return Object.keys(this._stateAttributes);
  }

  getConfigAttributeValue(name: string) {
    const config = this.getAttributeValue('config')
      , definition = this.getConfigAttribute(name)
    ;

    if (definition) {
      return definition.getValue(config[name]);
    } else {
      const value = config[name];
      if (value !== undefined) {
        return value;
      }
    }

    return null;
  }

  getStateAttributeValue(name: string) {
    const state = this.getAttributeValue('state')
      , definition = this.getStateAttribute(name)
    ;

    if (definition) {
      return definition.getValue(state[name]);
    } else {
      const value = state[name];
      if (value !== undefined) {
        return value;
      }
    }

    return null;
  }

  _updateStateAttributeValue(name: string, value: any) {
    let state = this.getAttributeValue('state') || {};
    state[name] = value;

    // The object we are working on is a copy, so we need to set it back on the sensor, which will use the types to validate
    return this.setAttributeValue('state', state);
  }

  _updateConfigAttributeValue(name: string, value: any) {
    const config = this.getAttributeValue('config') || {};
    config[name] = value;

    // The object we are working on is a copy, so we need to set it back on the sensor, which will use the types to validate
    return this.setAttributeValue('config', config);
  }

  getHuePayload(): object {
    const data = super.getHuePayload();

    Sensor.removeNullValues(data.config);
    Sensor.removeNullValues(data.state);

    return data;
  }

  //TODO util function
  static removeNullValues(data: object | null) {
    if (data) {
      Object.keys(data).forEach(key => {
        // @ts-ignore
        const value = data[key];
        if (value === null) {
          // @ts-ignore
          delete data[key];
        }
      });
    }
  }
}
