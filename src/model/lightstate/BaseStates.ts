import { States } from './States';

export abstract class BaseStates<T> extends States<T> {

  constructor(attributes?: string[]) {
    super([
        ...[
          'on',
          'bri',
          'hue',
          'sat',
          'xy',
          'ct',
          'effect',
          'transitiontime'
        ],
      ...(attributes ? attributes : [])
      ]
    );
  }

  on(on?: boolean) {
    if (on !== undefined) {
      return this._setStateValue('on', on);
    } else {
      return this._setStateValue('on', true);
    }
  }

  off(off?: boolean) {
    if (off !== undefined) {
      return this._setStateValue('on', !off);
    } else {
      return this._setStateValue('on', false);
    }
  }

  bri(value: number | null) {
    return this._setStateValue('bri', value);
  }

  hue(value: number | null) {
    return this._setStateValue('hue', value);
  }

  sat(value: number | null) {
    return this._setStateValue('sat', value);
  }

  xy(x: number | number[], y?: number | null) {
    if (Array.isArray(x)) {
      return this._setStateValue('xy', x);
    } else {
      return this._setStateValue('xy', [x, y]);
    }
  }

  ct(value: number) {
    return this._setStateValue('ct', value);
  }

  effect(value?: string) {
    return this._setStateValue('effect', value);
  }

  transitiontime(value?: number) {
    return this._setStateValue('transitiontime', value);
  }

  /**
   * Sets a percentage brightness value
   * @param value
   */
  brightness(value: number) {
    const bri = this._convertPercentageToStateValue(value, 'bri');
    return this.bri(bri);
  }

  /**
   * Sets a percentage saturation value
   * @param value
   */
  saturation(value: number) {
    const sat = this._convertPercentageToStateValue(value, 'sat');
    return this.sat(sat);
  }

  effectColorLoop() {
    return this.effect('colorloop');
  }

  effectNone() {
    return this.effect('none');
  }

  transition(value: number) {
    return this.transitionInMillis(value);
  }

  transitionSlow() {
    return this.transitiontime(8);
  }

  transitionFast() {
    return this.transitiontime(2);
  }

  transitionInstant() {
    return this.transitiontime(0);
  }

  transitionInMillis(value: number) {
    return this.transitiontime(value / 100);
  }

  transitionDefault() {
    return this.transitiontime(4);
  }
}
