'use strict';

import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig, RangedNumberTypeConfig } from './TypeConfig';

const UINT16_DEFAULTS = {
  type: 'uint16',
  typeMin: 0,
  typeMax: 65535
}

export default class UInt16Type extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...UINT16_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseInt(val);
  }
};