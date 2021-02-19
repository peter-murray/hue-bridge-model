import { BooleanType, ChoiceType, ObjectType, StringType, UInt16Type, UInt8Type } from '../types';
import { BridgeObject } from './BridgeObject';

const ATTRIBUTES = [
  // Modifiable Attributes
  new UInt16Type({name: 'proxyport'}),
  new StringType({name: 'proxyaddress', minLength: 0, maxLength: 40}),
  new StringType({name: 'name', minLength: 4, maxLength: 16}),
  new BooleanType({name: 'linkbutton'}), // Only works on the portal not in local network
  new StringType({name: 'ipaddress'}),
  new StringType({name: 'netmask'}),
  new StringType({name: 'gateway'}),
  new BooleanType({name: 'dhcp'}),
  new StringType({name: 'timezone'}),
  new BooleanType({name: 'touchlink'}),
  new ChoiceType({name: 'zigbeechannel', validValues: [11, 15, 20, 25]}),
  new StringType({name: 'UTC'}),

  // R/O attributes
  new StringType({name: 'localtime'}),
  new ObjectType({
    name: 'swupdate2',
    types: [
      new BooleanType({name: 'checkforupdate'}),
      new StringType({name: 'lastchange'}), // This is an iso time format
      new ChoiceType({
        name: 'state',
        validValues: [
          'unknown',
          'noupdates',
          'transferring',
          'anyreadytoinstall',
          'allreadytoinstall',
          'installing',
        ]
      }),
      new ObjectType({
        name: 'autoinstall',
        types: [
          new StringType({name: 'updatetime'}),
          new BooleanType({name: 'on'}),
        ]
      }),
      new ObjectType({
        name: 'bridge',
        types: [
          new StringType({name: 'state'}),
          new StringType({name: 'lastinstall'}),
        ]
      }),
    ]
  }),
  new ObjectType({name: 'whitelist'}),
  new BooleanType({name: 'portalservices'}),
  new StringType({name: 'portalconnection'}),
  new ObjectType({
    name: 'portalstate',
    types: [
      new BooleanType({name: 'signedon'}),
      new BooleanType({name: 'incoming'}),
      new BooleanType({name: 'outgoing'}),
      new StringType({name: 'communication'}),
    ]
  }),
  new ObjectType({
    name: 'internetservices',
    types: [
      new ChoiceType({name: 'internet', validValues: ['connected', 'disconnected']}),
      new ChoiceType({name: 'remoteaccess', validValues: ['connected', 'disconnected']}),
      new ChoiceType({name: 'time', validValues: ['connected', 'disconnected']}),
      new ChoiceType({name: 'swupdate', validValues: ['connected', 'disconnected']}),
    ]
  }),
  new ObjectType({
    name: 'backup',
    types: [
      new ChoiceType({
        name: 'status',
        validValues: ['idle', 'startmigration', 'fileready_disabled', 'prepare_restore', 'restoring']
      }),
      new UInt8Type({name: 'errorcode'}),
    ]
  }),
  new StringType({name: 'apiversion'}),
  new StringType({name: 'swversion'}),
  new StringType({name: 'mac'}),
  new StringType({name: 'modelid'}),
  new StringType({name: 'bridgeid'}),
  new BooleanType({name: 'factorynew'}),
  new StringType({name: 'replacesbridgeid'}),
  new StringType({name: 'datastoreversion'}),
  new StringType({name: 'starterkitid'}),
];

type SWUpdate2 = {
  checkforupdate: boolean,
  lastchange: string,
  state: string,
  autoinstall: {
    updatetime: string,
    on: boolean
  },
  bridge: {
    state: string,
    lastinstall: string
  },
}

type InternetServices = {
  internet: string,
  remoteaccess: string,
  time: string,
  swupdate: string
}

export class BridgeConfiguration extends BridgeObject {

  constructor() {
    super(ATTRIBUTES);
  }

  set proxyport(value: number) {
    this.setAttributeValue('proxyport', value);
  }

  set proxyaddress(value: string) {
    this.setAttributeValue('proxyaddress', value);
  }

  set name(value: string) {
    this.setAttributeValue('name', value);
  }

  set linkbutton(value: boolean) {
    this.setAttributeValue('linkbutton', value);
  }

  set ipaddress(value: string) {
    this.setAttributeValue('ipaddress', value);
  }

  set netmask(value: string) {
    this.setAttributeValue('netmask', value);
  }

  set gateway(value: string) {
    this.setAttributeValue('gateway', value);
  }

  set dhcp(value: boolean) {
    this.setAttributeValue('dhcp', value);
  }

  set timezone(value: string) {
    this.setAttributeValue('timezone', value);
  }

  set touchlink(value: boolean) {
    this.setAttributeValue('touchlink', value);
  }

  set zigbeechannel(value: number) {
    this.setAttributeValue('zigbeechannel', value);
  }

  /**
   * Sets the time in UTC on the bridge, but only if there is internet connection (as it will use the internet for the time)
   * @param value An iso time format
   * @returns {BridgeObject}
   */
  set UTC(value: string) {
    this.setAttributeValue('UTC', value);
  }

  get portalservices(): boolean {
    return this.getAttributeValue('portalservices');
  }

  get portalconnection(): string {
    return this.getAttributeValue('portalconnection');
  }

  get portalstate(): object {
    return this.getAttributeValue('portalstate');
  }

  get localtime(): string {
    return this.getAttributeValue('localtime');
  }

  get proxyport(): number {
    return this.getAttributeValue('proxyport');
  }

  get proxyaddress(): string {
    return this.getAttributeValue('proxyaddress');
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  get linkbutton(): boolean {
    return this.getAttributeValue('linkbutton');
  }

  get ipaddress(): string {
    return this.getAttributeValue('ipaddress');
  }

  get netmask(): string {
    return this.getAttributeValue('netmask');
  }

  get gateway():string {
    return this.getAttributeValue('gateway');
  }

  get dhcp(): boolean {
    return this.getAttributeValue('dhcp');
  }

  get timezone(): string {
    return this.getAttributeValue('timezone');
  }

  get zigbeechannel(): number {
    return this.getAttributeValue('zigbeechannel');
  }

  get UTC(): string {
    return this.getAttributeValue('UTC');
  }

  get swupdate2(): SWUpdate2 {
    return this.getAttributeValue('swupdate2');
  }

  get whitelist(): object {
    return this.getAttributeValue('whitelist');
  }

  get internetservices(): InternetServices {
    return this.getAttributeValue('internetservices');
  }

  get backup(): object {
    return this.getAttributeValue('backup');
  }

  get apiversion(): string {
    return this.getAttributeValue('apiversion');
  }

  get swversion(): string {
    return this.getAttributeValue('swversion');
  }

  get mac(): string {
    return this.getAttributeValue('mac');
  }

  get modelid(): string {
    return this.getAttributeValue('modelid');
  }

  get bridgeid(): string {
    return this.getAttributeValue('bridgeid');
  }

  get factorynew(): boolean {
    return this.getAttributeValue('factorynew');
  }

  get replacesbridgeid(): string {
    return this.getAttributeValue('replacesbridgeid');
  }

  get datastoreversion(): string {
    return this.getAttributeValue('datastoreversion');
  }

  get starterkitid(): string {
    return this.getAttributeValue('starterkitid');
  }
};
