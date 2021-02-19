import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { instanceChecks, createFromBridge, createFromJson } from './model';

const TEST_DATA_PATH: string = path.join(__dirname, '../../test/data')
  , HUE_DATA_PATH: string = path.join(TEST_DATA_PATH, 'hue')
  , MODEL_DATA_PATH: string = path.join(TEST_DATA_PATH, 'model')
;

describe('Serialization Tests', () => {

  describe('groups', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'groups',
        instanceCheckFn: instanceChecks.isGroupInstance,
        typeFn: (payload: any) => {
          return payload.type.toLowerCase()
        }
      });
    });


    describe('node-hue-api payloads', () => {
      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'groups',
        instanceCheckFn: instanceChecks.isGroupInstance,
      });
    });
  });


  describe('lights', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'lights',
        instanceCheckFn: instanceChecks.isLightInstance,
        typeFn: () => 'light'
      });
    });

    describe('node-hue-api payloads', () => {

      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'lights',
        instanceCheckFn: instanceChecks.isLightInstance,
      });
    });
  });


  describe('sensors', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'sensors',
        instanceCheckFn: instanceChecks.isSensorInstance,
        typeFn: (payload: any) => {
          return payload.type.toLowerCase()
        }
      });
    });

    describe('node-hue-api payloads', () => {

      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'sensors',
        instanceCheckFn: instanceChecks.isSensorInstance,
      });
    });
  });


  describe('schedules', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'schedules',
        instanceCheckFn: instanceChecks.isScheduleInstance,
        typeFn: () => 'schedule'
      });
    });

    describe('node-hue-api payloads', () => {

      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'schedules',
        instanceCheckFn: instanceChecks.isScheduleInstance,
      });
    });
  });


  describe('resourcelinks', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'resourcelinks',
        instanceCheckFn: instanceChecks.isResourceLinkInstance,
        typeFn: () => 'resourcelink'
      });
    });

    describe('node-hue-api payloads', () => {

      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'resourcelinks',
        instanceCheckFn: instanceChecks.isResourceLinkInstance,
      });
    });
  });


  describe('scenes', () => {

    describe('hue bridge payloads', () => {
      bridgeSerializationTest({
        parentDirectory: HUE_DATA_PATH,
        directoryName: 'scenes',
        instanceCheckFn: instanceChecks.isSceneInstance,
        typeFn: (payload: any) => {
          return payload.type.toLowerCase();
        },
        convertIdFn: (id: string | number) => {
          return `${id}`
        },
      });
    });

    describe('node-hue-api payloads', () => {

      modelSerializationTest({
        parentDirectory: MODEL_DATA_PATH,
        directoryName: 'scenes',
        instanceCheckFn: instanceChecks.isSceneInstance,
      });
    });
  });
});


function modelSerializationTest(config: any) {
  const directory = config.parentDirectory
    , dirName = config.directoryName
    , instanceCheckFn = config.instanceCheckFn
  ;

  const cwd = path.join(directory, dirName);

  if (!fs.existsSync(cwd)) {
    return;
  }

  fs.readdirSync(cwd).forEach(file => {
    it(`should process model data "${file}"`, () => {
      // eslint-disable-next-line global-require
      const MODEL_PAYLOAD = require(path.join(cwd, file))
        , modelObject = createFromJson(MODEL_PAYLOAD)
      ;

      expect(instanceCheckFn(modelObject)).to.be.true;
      expect(modelObject.getJsonPayload()).to.deep.equal(MODEL_PAYLOAD);
    });
  });

}

function bridgeSerializationTest(config: any) {

  const directory = config.parentDirectory
    , dirName = config.directoryName
    , instanceCheckFn = config.instanceCheckFn
    , typeFn = config.typeFn
    , convertIdFn = config.convertIdFn || function (id: string | number) {
      return id
    }
  ;

  //TODO add validation of above

  const cwd = path.join(directory, dirName);
  if (!fs.existsSync(cwd)) {
    return;
  }

  fs.readdirSync(cwd).forEach(file => {
    it(`should process bridge data "${file}"`, () => {
      // eslint-disable-next-line global-require
      const BRIDGE_PAYLOAD = require(path.join(cwd, file));

      const id = 2
        , expected = removeNullsAndUndefined(Object.assign({id: convertIdFn(id)}, BRIDGE_PAYLOAD))
        , modelObject = createFromBridge(typeFn(BRIDGE_PAYLOAD), id, BRIDGE_PAYLOAD)
      ;

      expect(instanceCheckFn(modelObject)).to.equal(true, 'instance check failure');
      expect(modelObject.getHuePayload()).to.deep.equal(expected);
    });
  });
}

function removeNullsAndUndefined(data: any) {
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === null) {
      delete data[key];
    }

    if (data[key] instanceof Object) {
      removeNullsAndUndefined(data[key]);
    }
  });

  return data;
}