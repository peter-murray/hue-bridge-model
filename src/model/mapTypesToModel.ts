import { Light } from './Light';
import { Capabilities } from './Capabilities';
import { BridgeConfiguration } from './BridgeConfiguration';
import { Entertainment } from './groups/Entertainment';
import { LightGroup } from './groups/LightGroup';
import { Lightsource } from './groups/Lightsource';
import { Luminaire } from './groups/Luminaire';
import { Room } from './groups/Room';
import { Zone } from './groups/Zone';
import { ResourceLink } from './ResourceLink';
import { LightScene } from './scenes/LightScene';
import { GroupScene } from './scenes/GroupScene';
import { Schedule } from './Schedule';
import { Rule } from './rules/Rule';
import { CLIPGenericFlag } from './sensors/CLIPGenericFlag';
import { CLIPGenericStatus } from './sensors/CLIPGenericStatus';
import { CLIPHumidity } from './sensors/CLIPHumidity';
import { CLIPLightlevel } from './sensors/CLIPLightlevel';
import { CLIPOpenClose } from './sensors/CLIPOpenClose';
import { CLIPPresence } from './sensors/CLIPPresence';
import { CLIPSwitch } from './sensors/CLIPSwitch';
import { CLIPTemperature } from './sensors/CLIPTemperature';
import { Daylight } from './sensors/Daylight';
import { ZGPSwitch } from './sensors/ZGPSwitch';
import { ZLLLightlevel } from './sensors/ZLLLightlevel';
import { ZLLPresence } from './sensors/ZLLPresence';
import { ZLLSwitch } from './sensors/ZLLSwitch';
import { ZLLRelativeRotary } from './sensors/ZLLRelativeRotary';
import { ZLLTemperature } from './sensors/ZLLTemperature';
import { GeoFence } from './sensors/GeoFence';

type NameToModelMap<T> = {
  [name: string]: T
}

export const TYPES_TO_MODEL: NameToModelMap<any> = {
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
  zllrelativerotary: ZLLRelativeRotary,
  zlltemperature: ZLLTemperature,
  geofence: GeoFence,
};