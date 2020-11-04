'use strict';

import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig, RangedNumberTypeConfig } from './TypeConfig';

const INT8_DEFAULTS = {
  type: 'int8',
  typeMin: -255,
  typeMax: 255
}

export default class Int8Type extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...INT8_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseInt(val);
  }
};