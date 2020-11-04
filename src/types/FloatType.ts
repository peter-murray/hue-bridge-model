'use strict';

import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig } from './TypeConfig';

const FLOAT_DEFAULTS = {
  type: 'float',
  typeMin: -Number.MAX_VALUE,
  typeMax: Number.MAX_VALUE
}

export default class FloatType extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...FLOAT_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseFloat(val);
  }
};