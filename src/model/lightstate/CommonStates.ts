import BaseStates from './BaseStates';

export default class CommonStates extends BaseStates {

  constructor(attributes?: string[]) {
    let allAttributes: string[] = ['alert',
      'bri_inc',
      'sat_inc',
      'hue_inc',
      'ct_inc',
      'xy_inc']

    if (attributes) {
      allAttributes = [...allAttributes, ...attributes];
    }

    super(allAttributes);
  }

  alert(value?: string) {
    return this._setStateValue('alert', value);
  }

  bri_inc(inc: number) {
    return this._setStateValue('bri_inc', inc);
  }

  incrementBrightness(inc: number) {
    return this.bri_inc(inc);
  }

  sat_inc(inc: number) {
    return this._setStateValue('sat_inc', inc);
  }

  incrementSaturation(inc: number) {
    return this.sat_inc(inc);
  }

  hue_inc(inc: number) {
    return this._setStateValue('hue_inc', inc);
  }

  incrementHue(inc: number) {
    return this.hue_inc(inc);
  }

  ct_inc(inc: number) {
    return this._setStateValue('ct_inc', inc);
  }

  incrementCt(inc: number) {
    return this.ct_inc(inc);
  }

  incrementColorTemp(inc: number) {
    return this.ct_inc(inc);
  }

  xy_inc(x_inc: number, y_inc: number) {
    if (Array.isArray(x_inc)) {
      return this._setStateValue('xy_inc', x_inc);
    } else {
      return this._setStateValue('xy_inc', [x_inc, y_inc]);
    }
  }

  alertLong() {
    return this.alert('lselect');
  }

  alertShort() {
    return this.alert('select');
  }

  alertNone() {
    return this.alert('none');
  }
}