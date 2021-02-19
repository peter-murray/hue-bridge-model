import { RuleConditionOperator } from './RuleConditionOperator';
import { getOperator } from './operators';
import { HueBridgeModelError } from '../../../HueBridgeModelError';

export type RuleConditionData = {
  address: string,
  operator: RuleConditionOperator,
  value?: string | number | boolean,
}

export class RuleCondition {

  private readonly address: string;

  private readonly operator: RuleConditionOperator;

  private readonly value?: string | number | boolean |  null

  constructor(data: RuleConditionData) {
    // this.populate(data);
    this.address = data.address;
    this.value = data.value;

    const resolvedOperator = getOperator(data.operator);
    if (!resolvedOperator) {
      throw new HueBridgeModelError(`Failed to resolve a rule condition operator for '${data.operator}'`);
    }
    this.operator = resolvedOperator;
  }

  // get address() {
  //   return this._address;
  // }

  // get operator() {
  //   return this._operator;
  // }

  // setOperator(op: RuleConditionOperator) {
  //   const matchedOperator: RuleConditionOperator | null = getOperator(op);
  //   if (!matchedOperator) {
  //     throw new HueBridgeModelError('A valid RuleConditionOperator must be provided.');
  //   } else {
  //     this.operator = matchedOperator
  //   }
  // }

  // get value() {
  //   return this._value;
  // }
  //
  // set value(val) {
  //   this._value = val;
  // }

  get payload() {
    const result = {
      address: this.address,
      operator: this.operator.payload,
    };

    if (this.value !== null && this.value !== undefined) {
      // The bridge API will only accept string values currently, 28/09/2019
      // @ts-ignore
      result['value'] = `${this.value}`;
    }

    return result;
  }

  // populate(data: RuleConditionData) {
  //   let address = null
  //     , operator = null
  //     , value = null
  //   ;
  //
  //   if (data) {
  //     address = data.address || null;
  //     operator = getOperator(data.operator || null);
  //     value = (data.value !== undefined && data.value !== null) ? data.value : null;
  //   }
  //
  //   this.address = address;
  //   this._operator = operator;
  //   this.value = value;
  //
  //   return this;
  // }

  toString() {
    return JSON.stringify(this.payload);
  }
};