import { RangedNumberType } from './RangedNumberType';
import { NumberTypeConfig } from './BaseType';

const UINT8_DEFAULTS = {
  type: 'uint8',
  typeMin: 0,
  typeMax: 255
}

export class UInt8Type extends RangedNumberType {

  constructor(config: NumberTypeConfig) {
    super({...config, ...UINT8_DEFAULTS});
  }

  _convertToType(val: any) {
    return parseInt(val);
  }
}