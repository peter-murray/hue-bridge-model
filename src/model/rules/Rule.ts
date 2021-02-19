import { BridgeObjectWithId } from '../BridgeObjectWithId';
import { BooleanType, ChoiceType, StringType } from '../../types';
import { RuleCondition } from './conditions/RuleCondition';
import { BridgeAction } from '../actions/BridgeAction';
import * as ruleConditions from './conditions/index';
import { RuleConditionPayload } from './conditions/index';
import {createAction } from '../actions/index';
import { BridgeActionPayload } from '../actions/index';
import { LooseObject } from '../../AttributeObject';

const ATTRIBUTES = [
  new StringType({name: 'id'}),
  new StringType({name: 'name', maxLength: 32}),
  new StringType({name: 'owner'}),
  new StringType({name: 'created'}),
  new BooleanType({name: 'recycle'}),
  new StringType({name: 'lasttrigered'}),
  new StringType({name: 'timestriggered'}),
  new ChoiceType({
    name: 'status',
    validValues: ['enabled', 'disabled', 'resourcedeleted', 'looperror'],
    defaultValue: 'enabled'
  }),
  // conditions and actions are handled separately
];

export class Rule extends BridgeObjectWithId {

  private _conditions: RuleCondition[];

  private _actions: BridgeAction[];

  constructor(id?: string) {
    super(ATTRIBUTES, id);

    this._conditions = buildConditions();
    this._actions = buildActions();
  }

  get name(): string {
    return this.getAttributeValue('name');
  }

  set name(value) {
    this.setAttributeValue('name', value);
  }

  get created(): string {
    return this.getAttributeValue('created');
  }

  get owner(): string {
    return this.getAttributeValue('owner');
  }

  get lasttriggered(): string {
    return this.getAttributeValue('lasttriggered');
  }

  get timestriggered():string {
    return this.getAttributeValue('timestriggered');
  }

  get status():string {
    return this.getAttributeValue('status');
  }

  set recycle(val: boolean) {
    this.setAttributeValue('recycle', val);
  }

  get recycle() {
    return this.getAttributeValue('recycle');
  }

  get conditions() {
    return this._conditions;
  }

  addCondition(condition: RuleConditionPayload): Rule {
    this._conditions.push(buildCondition(condition));
    return this;
  }

  removeConditionAt(idx: number) {
    this._conditions.splice(idx, 1);
  }

  resetConditions() {
    this._conditions = buildConditions();
  }

  get actions(): BridgeAction[] {
    return this._actions;
  }

  addAction(action: BridgeActionPayload): Rule {
    this._actions.push(buildAction(action));
    return this;
  }

  removeActionAt(idx: number) {
    this._actions.splice(idx, 1);
  }

  resetActions() {
    this._actions = buildActions();
  }

  getConditionsPayload(): object[] {
    const result: object[] = [];

    this.conditions.forEach(condition => {
      result.push(condition.payload);
    });

    return result;
  }

  getActionsPayload(): object[] {
    const result: object[] = [];

    this.actions.forEach(action => {
      result.push(action.payload);
    });

    return result;
  }

  toStringDetailed(): string {
    let result = super.toStringDetailed();

    result += '\n  Conditions:';
    this.conditions.forEach(condition => {
      result += `\n    ${condition.toString()}`;
    });

    result += '\n  Actions:';
    this.actions.forEach(action => {
      result += `\n    ${action.toString()}`;
    });

    return result;
  }

  _populate(data: LooseObject) {
    super._populate(data);
    this._conditions = buildConditions(data ? data.conditions : null);
    this._actions = buildActions(data ? data.actions : null);
    return this;
  }

  getHuePayload() {
    const data = super.getHuePayload();

    data.conditions = this.getConditionsPayload();
    data.actions = this.getActionsPayload();

    return data;
  }

  getJsonPayload() {
    const data = super.getJsonPayload();

    data.conditions = this.getConditionsPayload();
    data.actions = this.getActionsPayload();

    return data;
  }
};



function buildCondition(condition: RuleConditionPayload): RuleCondition {
  return ruleConditions.createRuleCondition(condition);
}

function buildConditions(conditions?: RuleConditionPayload[]): RuleCondition[] {
  const result: RuleCondition[] = [];

  if (conditions) {
    conditions.forEach(condition => {
      result.push(buildCondition(condition));
    });
  }

  return result;
}

function buildAction(action: BridgeActionPayload): BridgeAction {
  return createAction(action);
}

function buildActions(actions?: BridgeActionPayload[]): BridgeAction[] {
  const result: BridgeAction[] = [];

  if (actions) {
    actions.forEach(action => {
      result.push(buildAction(action));
    });
  }

  return result;
}