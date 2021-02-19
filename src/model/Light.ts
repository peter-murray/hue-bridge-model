import { BridgeObjectId, BridgeObjectWithId } from './BridgeObjectWithId';
import { LooseObject } from '../AttributeObject';
import { ColorGamut, getColorGamut } from './ColorGamuts';
import { ObjectType, StringType, UInt8Type } from '../types';

const MODEL_TO_COLOR_GAMUT: { [key: string]: string } = {
  'LCT001': 'B',
  'LCT007': 'B',
  'LCT010': 'C',
  'LCT014': 'C',
  'LCT015': 'C',
  'LCT016': 'C',
  'LCT002': 'B',
  'LCT003': 'B',
  'LCT011': 'C',
  // 'LCT024': 'C', //TODO this can be read from capabilities.control.colorgamut and colorgamuttype now - REMOVE THIS
  'LTW011': '2200K-6500K',
  'LST001': 'A',
  'LLC010': 'A',
  'LLC011': 'A',
  'LLC012': 'A',
  'LLC006': 'A',
  'LLC005': 'A',
  'LLC007': 'A',
  'LLC014': 'A',
  'LLC013': 'A',
  'LLM001': 'B',
  'LLM010': '2200K-6500K',
  'LLM011': '2200K-6500K',
  'LTW001': '2200K-6500K',
  'LTW004': '2200K-6500K',
  'LTW010': '2200K-6500K',
  'LTW015': '2200K-6500K',
  'LTW013': '2200K-6500K',
  'LTW014': '2200K-6500K',
  'LLC020': 'C',
  'LST002': 'C',
  'LCT012': 'C',
  'LTW012': '2200K-6500K',

  // Lamps
  'LTP001': '2200K-6500K',
  'LTP002': '2200K-6500K',
  'LTP003': '2200K-6500K',
  'LTP004': '2200K-6500K',
  'LTP005': '2200K-6500K',
  'LTF001': '2200K-6500K',
  'LTF002': '2200K-6500K',
  'LTC001': '2200K-6500K',
  'LTC002': '2200K-6500K',
  'LTC003': '2200K-6500K',
  'LTC004': '2200K-6500K',
  'LTC011': '2200K-6500K',
  'LTC012': '2200K-6500K',
  'LTD001': '2200K-6500K',
  'LTD002': '2200K-6500K',
  'LFF001': '2200K-6500K',
  'LTT001': '2200K-6500K',
  'LDT001': '2200K-6500K',
};

const ATTRIBUTES = [
  new UInt8Type({name: 'id'}),
  new StringType({name: 'name', minLength: 0, maxLength: 32}),
  new StringType({name: 'type'}),
  new StringType({name: 'modelid'}),
  new StringType({name: 'manufacturername'}),
  new StringType({name: 'uniqueid'}),
  new StringType({name: 'productname'}),
  new StringType({name: 'productid'}),
  new ObjectType({name: 'state'}),
  new ObjectType({name: 'capabilities'}),
  new ObjectType({name: 'config'}),
  new ObjectType({
    name: 'swupdate',
    types: [
      new StringType({name: 'state'}),
      new StringType({name: 'lastinstall'}),
    ]
  }),
  new StringType({name: 'swversion'}),
  new StringType({name: 'swconfigid'}),
];

//TODO add support for making it easier to set power failure modes config.startup.mode = 'powerfail'

export class Light extends BridgeObjectWithId {

  protected mappedColorGamut: string | null = null;

  constructor(id: BridgeObjectId) {
    super(ATTRIBUTES, id);
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  set name(value: string) {
    this.setAttributeValue('name', value);
  }

  get type(): string {
    return this.getAttributeValue('type');
  }

  get modelid(): string {
    return this.getAttributeValue('modelid');
  }

  get manufacturername(): string {
    return this.getAttributeValue('manufacturername');
  }

  get uniqueid(): string {
    return this.getAttributeValue('uniqueid');
  }

  get productid(): string {
    return this.getAttributeValue('productid');
  }

  get productname(): string {
    return this.getAttributeValue('productname');
  }

  get swversion(): string {
    return this.getAttributeValue('swversion');
  }

  get swupdate(): string {
    return this.getAttributeValue('swupdate');
  }

  get state(): Object {
    return this.getAttributeValue('state');
  }

  get capabilities(): Object {
    return this.getAttributeValue('capabilities');
  }

  get colorGamut(): ColorGamut | null {
    if (this.mappedColorGamut && this.mappedColorGamut !== '2200K-6500K') {
      return getColorGamut(this.mappedColorGamut);
    } else {
      return null;
    }
  }

  /**
   * Gets the supported states that the light will accept.
   */
  getSupportedStates(): string[] {
    const states = Object.keys(this.state);

    // transitiontime is no longer provided in the light state raw data values from the Hue API
    states.push('transitiontime');

    // If there is a corresponding settings, then include the xxx_inc variant
    ['bri', 'sat', 'hue', 'ct', 'xy'].forEach(key => {
      if (states.indexOf(key) > -1) {
        states.push(`${key}_inc`);
      }
    });

    return states;
  }

  _populate(data: LooseObject) {
    if (data) {
      this.mappedColorGamut = resolveColorGamutFromData(data);
    } else {
      this.mappedColorGamut = null;
    }

    return super._populate(data);
  }
}

function getValueforKey(key: string, data: Object): string | null {
  // Use dot notation to get nested values
  const path = key.split('.');

  let target: Object | null = data
    , value: Object | null = null
  ;

  path.forEach(part => {
    if (target != null) {
      // @ts-ignore
      value = target[part];
      target = value;
    } else {
      target = null;
    }
  });

  return `${value}`;
}

function resolveColorGamutFromData(data: LooseObject): string | null {
  // Newer Hue devices report their own color gamuts under 'capabilities.control.colorgamuttype'
  let colorGamutType: string | null = getValueforKey('capabilities.control.colorgamuttype', data);

  if (!colorGamutType) {
    colorGamutType = MODEL_TO_COLOR_GAMUT[data.modelid];
  }

  return colorGamutType;
}