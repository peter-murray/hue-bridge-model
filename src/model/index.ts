import BridgeObject from './BridgeObject';
import BridgeObjectWithId from './BridgeObjectWithId';

import ResourceLink from './ResourceLink';

import Light from './Light';

import Schedule from './Schedule';

import Group from './groups/Group';
import Entertainment from './groups/Entertainment';
import LightGroup from './groups/LightGroup';
import Lightsource from './groups/Lightsource';
import Luminaire from './groups/Luminaire';
import Room from './groups/Room';
import Zone from './groups/Zone';

import GroupScene from './scenes/GroupScene';
import LightScene from './scenes/LightScene';

import LightState from './lightstate/LightState';
import GroupState from './lightstate/GroupState';
import SceneLightState from './lightstate/SceneLightState';

import Sensor from './sensors/Sensor';
import CLIPGenericFlag from './sensors/CLIPGenericFlag';
import CLIPGenericStatus from './sensors/CLIPGenericStatus';
import CLIPHumidity from './sensors/CLIPHumidity';
import CLIPLightlevel from './sensors/CLIPLightlevel';
import CLIPOpenClose from './sensors/CLIPOpenClose';
import CLIPPresence from './sensors/CLIPPresence';
import CLIPSwitch from './sensors/CLIPSwitch';
import CLIPTemperature from './sensors/CLIPTemperature';
import Daylight from './sensors/Daylight';
import ZGPSwitch from './sensors/ZGPSwitch';
import ZLLLightlevel from './sensors/ZLLLightlevel';
import ZLLPresence from './sensors/ZLLPresence';
import ZLLSwitch from './sensors/ZLLSwitch';
import ZLLTemperature from './sensors/ZLLTemperature';
import GeoFence from './sensors/GeoFence';

import HueBridgeModelError from '../HueBridgeModelError';

import Rule from './rules/Rule';
import SensorCondition from './rules/conditions/SensorCondition';
import GroupCondition from './rules/conditions/GroupCondition';
import LightStateAction from './actions/LightStateAction';
import SensorStateAction from './actions/SensorStateAction';
import GroupStateAction from './actions/GroupStateAction';
import SceneAction from './actions/SceneAction';
import * as ConditionOperators from './rules/conditions/operators/index'
import Scene from './scenes/Scene';

import BridgeConfiguration from './BridgeConfiguration';
import Capabilities from './Capabilities';


const lightStates = {
  LightState: LightState,
  GroupLightState: GroupState,
}

const ruleConditionOperators = {
  equals: ConditionOperators.Equals,
  //TODO?
}

const actions = {
  light: function (light: Light | number | string) {
    return new LightStateAction(light);
  },

  group: function (group: Group | number | string) {
    return new GroupStateAction(group);
  },

  sensor: function (sensor: Sensor | number | string) {
    return new SensorStateAction(sensor);
  },

  scene: function (scene: Scene | string) {
    return new SceneAction(scene);
  }
}

const ruleConditions = {
  sensor: function (sensor: Sensor) {
    return new SensorCondition(sensor);
  },

  group: function (id: string) {
    return new GroupCondition(id);
  },
}

const builder = {
  
  createEntertainment: function () {
    return new Entertainment();
  },
  createLightGroup: function () {
    return new LightGroup();
  },
  createRoom: function () {
    return new Room();
  },
  createZone: function () {
    return new Zone();
  },
  
  createRule: function() {
    return new Rule();
  },
  
  createSchedule: function() {
    return new Schedule();
  },
  
  createLightScene: function() {
    return new LightScene();
  },
  createGroupScene: function() {
    return new GroupScene();
  },

  createCLIPGenericFlagSensor: function () {
    return new CLIPGenericFlag();
  },
  createCLIPGenericStatusSensor: function () {
    return new CLIPGenericStatus();
  },
  createCLIPHumiditySensor: function () {
    return new CLIPHumidity();
  },
  createCLIPLightlevelSensor: function () {
    return new CLIPLightlevel();
  },
  createCLIPOpenCloseSensor: function () {
    return new CLIPOpenClose();
  },
  createCLIPPresenceSensor: function () {
    return new CLIPPresence();
  },
  createCLIPTemperatureSensor: function () {
    return new CLIPTemperature();
  },
  createCLIPSwitchSensor: function () {
    return new CLIPSwitch();
  },

  createResourceLink: function() {
    return new ResourceLink();
  }
}

const checks = {
  isLightInstance : function (obj: any) {
    return obj instanceof Light;
  },

  //TODO possibly remove this
  isSceneInstance : function (obj: any) {
    return obj instanceof Scene;
  },

  isGroupSceneInstance : function (obj: any) {
    return obj instanceof GroupScene;
  },

  isLightSceneInstance : function (obj: any) {
    return obj instanceof LightScene;
  },

  isRuleInstance : function (obj: any) {
    return obj instanceof Rule;
  },

  isResourceLinkInstance : function (obj: any) {
    return obj instanceof ResourceLink;
  },

  isScheduleInstance : function (obj: any) {
    return obj instanceof Schedule;
  },

  isSensorInstance : function (obj: any) {
    return obj instanceof Sensor;
  },

  isGroupInstance : function (obj: any) {
    return obj instanceof Group;
  },

  isBridgeConfigurationInstance : function (obj: any) {
    return obj instanceof BridgeConfiguration;
  },

  createBridgeConfiguration : function () {
    return new BridgeConfiguration();
  },
}

export {
  BridgeObject,
  BridgeObjectWithId,
  ResourceLink,
  Light,
  Schedule,

  Group,
  Entertainment,
  LightGroup,
  Lightsource,
  Luminaire,
  Room,
  Zone,

  GroupScene,
  LightScene,

  LightState,
  GroupState,
  SceneLightState,

  lightStates,

  ruleConditionOperators,
  ruleConditions,
  actions,

  Sensor,
  CLIPGenericFlag,
  CLIPGenericStatus,
  CLIPHumidity,
  CLIPLightlevel,
  CLIPOpenClose,
  CLIPPresence,
  CLIPSwitch,
  CLIPTemperature,
  Daylight,
  ZGPSwitch,
  ZLLLightlevel,
  ZLLPresence,
  ZLLSwitch,
  ZLLTemperature,
  GeoFence,

  Rule,
  SensorCondition,
  GroupCondition,
  GroupStateAction,
  LightStateAction,
  SensorStateAction,
  SceneAction,
  ConditionOperators,

  BridgeConfiguration,

  Capabilities,

  createFromBridge,
  createFromJson,

  builder,
  checks,
};

type NameToModelMap<T> = {
  [name: string]: T
}

const TYPES_TO_MODEL: NameToModelMap<any> = {
  light: Light,

  capabilities: Capabilities,

  configuration: BridgeConfiguration,

  entertainment: Entertainment,
  lightgroup: LightGroup,
  lightsource: Lightsource,
  luminaire: Luminaire,
  room: Room,
  zone: Zone,

  resourcelink: ResourceLink,

  lightscene: LightScene,
  groupscene: GroupScene,

  schedule: Schedule,

  rule: Rule,

  clipgenericflag: CLIPGenericFlag,
  clipgenericstatus: CLIPGenericStatus,
  cliphumidity: CLIPHumidity,
  cliplightlevel: CLIPLightlevel,
  clipopenclose: CLIPOpenClose,
  clippresence: CLIPPresence,
  clipswitch: CLIPSwitch,
  cliptemperature: CLIPTemperature,
  daylight: Daylight,
  zgpswitch: ZGPSwitch,
  zlllightlevel: ZLLLightlevel,
  zllpresence: ZLLPresence,
  zllswitch: ZLLSwitch,
  zlltemperature: ZLLTemperature,
  geofence: GeoFence,
};

function createFromBridge (type: string, id: string | number, payload: object) {
  const ModelObject: BridgeObject = TYPES_TO_MODEL[type];

  if (!ModelObject) {
    throw new HueBridgeModelError(`Unknown type '${type}' to create Bridge Model Object from.`);
  }

  // @ts-ignore
  const instance = new ModelObject(id);
  instance._populate(payload);
  return instance;
}

export type BridgeJsonPayload = {
  [name: string]: any,
  type: string,
  version: number,
}

//TODO defined a type for object
function createFromJson(payload: BridgeJsonPayload) {
  const payloadDataType = payload.node_hue_api;
  if (!payloadDataType) {
    throw new HueBridgeModelError('Missing payload Data Type definition');
  }

  const type = payloadDataType.type
    , version = payloadDataType.version || 0
  ;

  if (!type) {
    throw new HueBridgeModelError('Invalid payload, missing type from the Data Type');
  }

  if (version === 0) {
    throw new HueBridgeModelError(`Unsupported version number ${version}, for JSON payload`);
  }

  // Default to using bridge data construction until we diverge
  return createFromBridge(type, payload.id, payload);
}