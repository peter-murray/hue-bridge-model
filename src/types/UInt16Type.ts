import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig } from './BaseType';

const UINT16_DEFAULTS = {
  type: 'uint16',
  typeMin: 0,
  typeMax: 65535
}

export class UInt16Type extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...UINT16_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseInt(val);
  }
}