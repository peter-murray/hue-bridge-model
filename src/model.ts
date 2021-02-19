import { BridgeObject } from './model/BridgeObject';
import * as ConditionOperators from './model/rules/conditions/operators';
import { TYPES_TO_MODEL } from './model/mapTypesToModel';
import { getOperator } from './model/rules/conditions/operators';
import { HueBridgeModelError } from './HueBridgeModelError';
import { BridgeConfiguration } from './model/BridgeConfiguration';
import { Group } from './model/groups/Group';
import { Sensor } from './model/sensors/Sensor';
import { Light } from './model/Light';
import { Scene } from './model/scenes/Scene';
import { GroupScene } from './model/scenes/GroupScene';
import { LightScene } from './model/scenes/LightScene';
import { Rule } from './model/rules/Rule';
import { ResourceLink } from './model/ResourceLink';
import { Schedule } from './model/Schedule';
import { LightState } from './model/lightstate/LightState';
import { GroupState } from './model/lightstate/GroupState';
import { SceneLightState } from './model/lightstate/SceneLightState';
import { SensorCondition } from './model/rules/conditions/SensorCondition';
import { GroupCondition } from './model/rules/conditions/GroupCondition';
import { LightStateAction } from './model/actions/LightStateAction';
import { GroupStateAction } from './model/actions/GroupStateAction';
import { SensorStateAction } from './model/actions/SensorStateAction';
import { SceneAction } from './model/actions/SceneAction';

export * from './HueBridgeModelError';
export * from './model/BridgeObject';
export * from './model/BridgeObjectWithId';
export * from './model/ResourceLink';
export * from './model/Light';
export * from './model/Schedule';
export * from './model/groups/Group';
export * from './model/groups/Entertainment';
export * from './model/groups/LightGroup';
export * from './model/groups/Lightsource';
export * from './model/groups/Luminaire';
export * from './model/groups/Room';
export * from './model/groups/Zone';
export * from './model/scenes/GroupScene';
export * from './model/scenes/LightScene';
export * from './model/lightstate/LightState';
export * from './model/lightstate/GroupState';
export * from './model/lightstate/SceneLightState';
export * from './model/sensors/Sensor';
export * from './model/sensors/CLIPGenericFlag';
export * from './model/sensors/CLIPGenericStatus';
export * from './model/sensors/CLIPHumidity';
export * from './model/sensors/CLIPLightlevel';
export * from './model/sensors/CLIPOpenClose';
export * from './model/sensors/CLIPPresence';
export * from './model/sensors/CLIPSwitch';
export * from './model/sensors/CLIPTemperature';
export * from './model/sensors/Daylight';
export * from './model/sensors/ZGPSwitch';
export * from './model/sensors/ZLLLightlevel';
export * from './model/sensors/ZLLPresence';
export * from './model/sensors/ZLLSwitch';
export * from './model/sensors/ZLLTemperature';
export * from './model/sensors/GeoFence';
export * from './model/rules/Rule';
export * from './model/rules/conditions/SensorCondition';
export * from './model/rules/conditions/GroupCondition';
export * from './model/actions/LightStateAction';
export * from './model/actions/SensorStateAction';
export * from './model/actions/GroupStateAction';
export * from './model/actions/SceneAction';
export * from './model/scenes/Scene';
export * from './model/BridgeConfiguration';
export * from './model/Capabilities';


export type BridgeJsonPayload = {
  [name: string]: any,
  type: string,
  version: number,
}

export const lightStates = {
  LightState: LightState,
  GroupLightState: GroupState,
  SceneLightState: SceneLightState,
};

export const ruleConditionOperators = {
  equals: ConditionOperators.Equals,
  changed: ConditionOperators.Dx,
  changedDelayed: ConditionOperators.Ddx,
  greaterThan: ConditionOperators.GreaterThan,
  lessThan: ConditionOperators.LessThan,
  stable: ConditionOperators.Stable,
  notStable: ConditionOperators.NotStable,
  in: ConditionOperators.In,
  notIn: ConditionOperators.NotIn,
  getOperator,
};

export const actions = {
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
};

export const ruleConditions = {
  sensor: function (sensor: Sensor) {
    return new SensorCondition(sensor);
  },

  group: function (id: string) {
    return new GroupCondition(id);
  },
};

export const instanceChecks = {
  isLightInstance: function (obj: any) {
    return obj instanceof Light;
  },

  isSceneInstance: function (obj: any) {
    return obj instanceof Scene;
  },

  isGroupSceneInstance: function (obj: any) {
    return obj instanceof GroupScene;
  },

  isLightSceneInstance: function (obj: any) {
    return obj instanceof LightScene;
  },

  isRuleInstance: function (obj: any) {
    return obj instanceof Rule;
  },

  isResourceLinkInstance: function (obj: any) {
    return obj instanceof ResourceLink;
  },

  isScheduleInstance: function (obj: any) {
    return obj instanceof Schedule;
  },

  isSensorInstance: function (obj: any) {
    return obj instanceof Sensor;
  },

  isGroupInstance: function (obj: any) {
    return obj instanceof Group;
  },

  isBridgeConfigurationInstance: function (obj: any) {
    return obj instanceof BridgeConfiguration;
  },
};

export function createFromBridge(type: string, id: string | number | undefined, payload: object) {
  const ModelObject: BridgeObject = TYPES_TO_MODEL[type];

  if (!ModelObject) {
    throw new HueBridgeModelError(`Unknown type '${type}' to create Bridge Model Object from.`);
  }

  // @ts-ignore
  const instance = new ModelObject(id);
  instance._populate(payload);
  return instance;
}

//TODO defined a type for object
export function createFromJson(payload: BridgeJsonPayload) {
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