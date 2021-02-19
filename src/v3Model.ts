// import * as model from './model'
// import {ruleConditionOperators, createFromJson, createFromBridge, instanceChecks, Light, Group, Sensor} from './model'
//
// import LightState from './model/lightstate/LightState';
// import GroupState from './model/lightstate/GroupState';
// import SceneLightState from './model/lightstate/SceneLightState';
//
// import {WEEKDAYS} from './timePatterns/timeUtil'
// import {
//   createAbsoluteTime, createFromString,
//   createRandomizedTime, createRandomizedTimer,
//   createRecurringRandomizedTime, createRecurringRandomizedTimer,
//   createRecurringTime, createRecurringTimer, createTimeInterval, createTimer,
//   isRecurring, isTimePattern
// } from './timePatterms';
//
// import Scene from './model/scenes/Scene';
//
// const lightStates = {
//   LightState,
//   GroupLightState: GroupState,
//   SceneLightState,
// }
//
// const timePatterns = {
//   weekdays: WEEKDAYS,
//   isRecurring,
//   createAbsoluteTime,
//   createRandomizedTime,
//   createRecurringTime,
//   createRecurringRandomizedTime,
//   createTimeInterval,
//   createTimer,
//   createRecurringTimer,
//   createRandomizedTimer,
//   createRecurringRandomizedTimer,
//   createFromString,
//   isTimePattern,
// }
//
// const actions = {
//   light: (light: Light | string |  number) => {
//     return new model.LightStateAction(light);
//   },
//   group: (group: Group | number | string) => {
//     return new model.GroupStateAction(group);
//   },
//   sensor: (sensor: Sensor | number | string) => {
//     return new model.SensorStateAction(sensor);
//   },
//   scene: (scene: Scene | string) => {
//     return new model.SceneAction(scene);
//   }
// }
//
// const ruleConditions = {
//   sensor: function (sensor: Sensor) {
//     return new model.SensorCondition(sensor);
//   },
//
//   group: function (id: Group | string | number) {
//     return new model.GroupCondition(id);
//   },
// }
//
// function isLightInstance(obj: any) {
//   return instanceChecks.isLightInstance(obj);
// }
//
// function isSceneInstance(obj: any) {
//   return instanceChecks.isSceneInstance(obj)
// }
//
// function isGroupSceneInstance(obj: any) {
//   return instanceChecks.isGroupSceneInstance(obj);
// }
//
// function isLightSceneInstance(obj: any) {
//   return instanceChecks.isLightSceneInstance(obj)
// }
//
// function isRuleInstance(obj: any) {
//   return instanceChecks.isRuleInstance(obj)
// }
//
// function isResourceLinkInstance(obj: any) {
//   return instanceChecks.isResourceLinkInstance(obj)
// }
//
// function isScheduleInstance(obj: any) {
//   return instanceChecks.isScheduleInstance(obj)
// }
//
// function isSensorInstance(obj: any) {
//   return instanceChecks.isSensorInstance(obj)
// }
//
// function isGroupInstance(obj: any) {
//   return instanceChecks.isGroupInstance(obj)
// }
//
// function isBridgeConfigurationInstance(obj: any) {
//   return instanceChecks.isBridgeConfigurationInstance(obj)
// }
//
//
// // Providing a drop in replacement for the v3 model extracted from node-hue-api library
// export {
//   lightStates,
//   timePatterns,
//
//   isLightInstance,
//   isSceneInstance,
//   isGroupSceneInstance,
//   isLightSceneInstance,
//   isRuleInstance,
//   isResourceLinkInstance,
//   isScheduleInstance,
//   isSensorInstance,
//   isGroupInstance,
//   isBridgeConfigurationInstance,
//
//   createEntertainment,
//   createLightGroup,
//   createRoom,
//   createZone,
//
//   createCLIPGenericFlagSensor,
//   createCLIPGenericStatusSensor,
//   createCLIPHumiditySensor,
//   createCLIPLightlevelSensor,
//   createCLIPOpenCloseSensor,
//   createCLIPPresenceSensor,
//   createCLIPTemperatureSensor,
//   createCLIPSwitchSensor,
//
//   createLightScene,
//   createGroupScene,
//
//   createSchedule,
//
//   actions,
//
//   createRule,
//   ruleConditions,
//   ruleConditionOperators,
//
//   createResourceLink,
//
//   createFromBridge,
//   createFromJson,
// }
//
//
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Groups
//
// function createEntertainment() {
//   return new model.Entertainment();
// }
//
// function createLightGroup() {
//   return new model.LightGroup();
// }
//
// function createRoom() {
//   return new model.Room();
// }
//
// function createZone() {
//   return new model.Zone();
// }
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Sensors
//
// function createCLIPGenericFlagSensor() {
//   return new model.CLIPGenericFlag();
// }
//
// function createCLIPGenericStatusSensor() {
//   return new model.CLIPGenericStatus();
// }
//
// function createCLIPHumiditySensor() {
//   return new model.CLIPHumidity();
// }
//
// function createCLIPLightlevelSensor() {
//   return new model.CLIPLightlevel();
// }
//
// function createCLIPOpenCloseSensor() {
//   return new model.CLIPOpenClose();
// }
//
// function createCLIPPresenceSensor() {
//   return new model.CLIPPresence();
// }
//
// function createCLIPTemperatureSensor() {
//   return new model.CLIPTemperature();
// }
//
// function createCLIPSwitchSensor (){
//   return new model.CLIPSwitch();
// }
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Scenes
//
// function createLightScene () {
//   return new model.LightScene();
// }
//
// function createGroupScene() {
//   return new model.GroupScene();
// }
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Schedules
//
// function createSchedule () {
//   return new model.Schedule();
// }
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Rules
//
// function createRule() {
//   return new model.Rule();
// }
//
//
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // ResourceLinks
//
// function createResourceLink () {
//   return new model.ResourceLink();
// }