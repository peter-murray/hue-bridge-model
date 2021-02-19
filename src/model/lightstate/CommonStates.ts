import { BaseStates } from './BaseStates';

export class CommonStates<T> extends BaseStates<T> {

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

  alert(value?: string): T {
    return this._setStateValue('alert', value);
  }

  bri_inc(inc: number): T {
    return this._setStateValue('bri_inc', inc);
  }

  incrementBrightness(inc: number): T {
    return this.bri_inc(inc);
  }

  sat_inc(inc: number): T {
    return this._setStateValue('sat_inc', inc);
  }

  incrementSaturation(inc: number): T {
    return this.sat_inc(inc);
  }

  hue_inc(inc: number): T {
    return this._setStateValue('hue_inc', inc);
  }

  incrementHue(inc: number): T {
    return this.hue_inc(inc);
  }

  ct_inc(inc: number): T {
    return this._setStateValue('ct_inc', inc);
  }

  incrementCt(inc: number): T {
    return this.ct_inc(inc);
  }

  incrementColorTemp(inc: number): T {
    return this.ct_inc(inc);
  }

  xy_inc(x_inc: number, y_inc: number): T {
    if (Array.isArray(x_inc)) {
      this._setStateValue('xy_inc', x_inc);
    } else {
      this._setStateValue('xy_inc', [x_inc, y_inc]);
    }
    return this.me;
  }

  alertLong(): T {
    return this.alert('lselect');
  }

  alertShort(): T {
    return this.alert('select');
  }

  alertNone(): T {
    return this.alert('none');
  }
}