'use strict';

import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig } from './TypeConfig';

const INT16_DEFAULTS = {
  type: 'int16',
  typeMin: -65535,
  typeMax: 65535
}

export default class Int16Type extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...INT16_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseInt(val);
  }
};