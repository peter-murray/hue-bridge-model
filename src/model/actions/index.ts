import { BridgeAction, BridgeActionData } from './BridgeAction';
import { LightStateAction } from './LightStateAction';
import { GroupStateAction } from './GroupStateAction';
import { HueBridgeModelError } from '../../HueBridgeModelError';
import { SensorStateAction } from './SensorStateAction';
import { ScheduleStateAction } from './ScheduleStateAction';
import { SceneAction } from './SceneAction';

const REGEX_GROUP_ACTION = /\/groups\/(.*)\/action/
  , REGEX_SENSOR_ACTION = /\/sensors\/(.*)\/state/
  , REGEX_LIGHT_ACTION = /\/lights\/(.*)\//
  , REGEX_SCHEDULE_ACTION = /\/schedules\/(.*)/
  , REGEX_SCHEDULES = /\/schedules$/
  , REGEX_SCENE_ACTION = /\/scenes\/(.*)/
;

export type BridgeActionPayload = BridgeAction | BridgeActionData;

export function createAction(data: BridgeActionPayload): BridgeAction {
  if (data instanceof BridgeAction) {
    return data;
  } else if (data.address) {
    if (REGEX_GROUP_ACTION.exec(data.address)) {
      return createGroupAction(data.address, data.body);
    } else if (REGEX_LIGHT_ACTION.exec(data.address)) {
      return createLightStateAction(data.address, data.body);
    } else if (REGEX_SENSOR_ACTION.exec(data.address)) {
      return createSensorStateAction(data.address, data.body);
    } else if (REGEX_SCENE_ACTION.exec(data.address)) {
      return createSceneAction(data.address, data.body);
    } else if (REGEX_SCHEDULE_ACTION.exec(data.address)) {
      return createScheduleAction(data.address, data.body);
    } else if (REGEX_SCHEDULES.exec(data.address)) {
      return createSchedulesAction(data.address, data.body);
    } else {
      throw new HueBridgeModelError(`Failed to match an action to the address ${data.address}`);
    }
  } else {
    throw new HueBridgeModelError('No address property for action');
  }
}


function createLightStateAction(address: string, body: any) {
  const match = REGEX_LIGHT_ACTION.exec(address);
  if (!match) {
    throw new HueBridgeModelError(`Invalid address value for light state action '${address}'`);
  }
  const id = match[1];
  return new LightStateAction(id).withState(body);
}

function createGroupAction(address: string, body: any) {
  const match = REGEX_GROUP_ACTION.exec(address);

  if (!match) {
    throw new HueBridgeModelError(`Invalid address value for group action '${address}'`);
  }
  const group = match[1];
  return new GroupStateAction(group).withState(body);
}

function createSensorStateAction(address: string, body: any) {
  const match = REGEX_SENSOR_ACTION.exec(address);

  if (!match) {
    throw new HueBridgeModelError(`Invalid address value for sensor state action '${address}'`);
  }
  const id = match[1];
  return new SensorStateAction(id).withState(body);
}

function createScheduleAction(address: string, body: any) {
  const match = REGEX_SCHEDULE_ACTION.exec(address);

  if (!match) {
    throw new HueBridgeModelError(`Invalid address value for schedule action '${address}'`);
  }
  const id = match[1];
  return new ScheduleStateAction(id).withState(body);
}

function createSchedulesAction(address: string, body: any) {
  const match = REGEX_SCHEDULES.exec(address);

  if (!match) {
    throw new HueBridgeModelError(`Not a valid schedules action, '${address}'`);
  }

  return new ScheduleStateAction().withState(body);
}

function createSceneAction(address: string, body: any) {
  const match = REGEX_SCENE_ACTION.exec(address);

  if (!match) {
    throw new HueBridgeModelError(`Invalid address value for scenes action '${address}'`);
  }

  const id = match[1];
  return new SceneAction(id).withState(body);
}