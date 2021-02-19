import { Group } from '../../groups/Group';
import { RuleCondition, RuleConditionData } from './RuleCondition';
import {getOperator} from './operators';
import { RuleConditionOperator } from './RuleConditionOperator';
import { HueBridgeModelError } from '../../../HueBridgeModelError';


export class GroupCondition {

  readonly id: string | number;

  groupStateAttribute: string | null = null;

  private _operator: RuleConditionOperator | null = null;

  value?: string | number | boolean;

  constructor(id: Group | string | number) {
    if (id instanceof Group) {
      this.id = id.id;
    } else {
      this.id = id;
    }
  }

  when() {
    return new SelectAttribute(this);
  }

  getRuleCondition() {
    validateState(this);

    const data: RuleConditionData = {
      address: `/groups/${this.id}/state/${this.groupStateAttribute}`,
      // @ts-ignore
      operator: this._operator,
    };

    if (this.value !== undefined && this.value !== null) {
      data['value'] = this.value;
    }

    return new RuleCondition(data);
  }

  get operator() {
    return this._operator;
  }

  setOperator(value: string | RuleConditionOperator) {
    const operator = getOperator(value);
    if (operator) {
      this._operator = operator
    } else {
      throw new HueBridgeModelError(`Failed to resolve an operator for: '${JSON.stringify(value)}'`);
    }
  }

  _setRequiredValue(value: string | number | boolean | null) {
    if (value === null) {
      throw new HueBridgeModelError('A value is required when using this operator');
    }

    this.value = value;
  }
};


function validateState(condition: GroupCondition) {
  let message = null;

  if (condition.id === null || condition.id === undefined) {
    message = 'a group id is required';
  } else if (!condition.groupStateAttribute) {
    message = 'a state of the group is required';
  } else if (!condition.operator) {
    message = 'an operator for the group state value is required';
  }
  //TODO some operators require a value, others do not, might need to validate that here too, should have a function on the operator to check is a value is required

  if (message) {
    throw new HueBridgeModelError(`Invalid Condition, ${message}`);
  }
}


export class SelectAttribute {

  private _condition: GroupCondition;

  private _selectOperator: SelectOperator;

  constructor(condition: GroupCondition) {
    this._condition = condition;
    this._selectOperator = new SelectOperator(condition);
  }

  allOn(): SelectOperator {
    this._condition.groupStateAttribute = 'all_on';
    return this._selectOperator;
  }

  anyOn(): SelectOperator {
    this._condition.groupStateAttribute = 'any_on';
    return this._selectOperator;
  }
}


export class SelectOperator {

  private _condition: GroupCondition;

  constructor(condition: GroupCondition) {
    this._condition = condition;
  }

  equals(val: string | number| boolean) {
    this._condition.setOperator('eq');
    this._condition._setRequiredValue(val);
    return this._condition;
  }

  changed() {
    this._condition.setOperator('dx');
    // Clear any value that might have been set in the past
    this._condition.value = undefined;
    return this._condition;
  }

  changedDelayed(val: number | boolean) {
    this._condition.setOperator('ddx');
    this._condition._setRequiredValue(val); //TODO not sure this is required for ddx
    return this._condition;
  }
}