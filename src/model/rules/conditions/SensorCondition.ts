import { Sensor } from '../../sensors/Sensor';
import { HueBridgeModelError } from '../../../HueBridgeModelError';
import { RuleConditionOperator } from './RuleConditionOperator';
import { getOperator } from './operators';
import { RuleCondition } from './RuleCondition';

export class SensorCondition {

  //TODO naming

  private _sensor: Sensor;

  private _sensorStateAttribute: string | null;

  private _operator: RuleConditionOperator | null;

  private _value: any;

  constructor(sensor: Sensor) {
    this._sensor = sensor;
    this._sensorStateAttribute = null;
    this._operator = null;
    this._value = null;
  }

  when(attribute: string) {
    const self = this;

    validateSensorAttribute(this._sensor, attribute);
    this._sensorStateAttribute = attribute;

    return new SelectOperator(self);
  }

  get sensor(): Sensor {
    return this._sensor;
  }

  get sensorStateAttribute(): string | null {
    return this._sensorStateAttribute;
  }

  get operator(): RuleConditionOperator | null {
    return this._operator;
  }

  getRuleCondition() {
    validateState(this);

    const data = {
      address: `/sensors/${this.sensor.id}/state/${this.sensorStateAttribute}`,
      operator: this.operator,
      value: this._value
    };
    // @ts-ignore
    return new RuleCondition(data);
  }

  //TODO
  _setOperator(value: RuleConditionOperator | string) {
    this._operator = getOperator(value);
  }

  //TODO
  _setRequiredValue(value: any) {
    if (value === null || value === undefined) {
      throw new HueBridgeModelError('A value is required when using this operator');
    }

    this._value = value;
  }
};


function validateState(condition: SensorCondition) {
  let message = null;

  if (!condition.sensor) {
    message = 'a sensor is required';
  } else if (!condition.sensorStateAttribute) {
    message = 'a state of the sensor is required';
  } else if (!condition.operator) {
    message = 'an operator for the sensor state value is required';
  }
  //TODO some operators require a value, others do not, might need to validate that here too, should have a function on the operator to check is a value is required

  if (message) {
    throw new HueBridgeModelError(`Invalid Condition, ${message}`);
  }
}


function validateSensorAttribute(sensor: Sensor, attributeName: string) {
  const allAttributes = sensor.getStateAttributeNames();
  if (allAttributes.indexOf(attributeName) > -1) {
    return attributeName;
  } else {
    throw new HueBridgeModelError(`Attribute '${attributeName}' not found in sensor attributes, ${JSON.stringify(allAttributes)}`);
  }
}


class SelectOperator {

  private readonly _sensorCondition: SensorCondition;

  constructor(sensorCondition: SensorCondition) {
    this._sensorCondition = sensorCondition;
  }

  equals(val: boolean | number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('eq');
    // bool or int
    sensorCondition._setRequiredValue(val);
    return sensorCondition;
  }

  greaterThan(val: number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('gt');
    // int
    sensorCondition._setRequiredValue(val);
    return sensorCondition;
  }

  lessThan(val: number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('lt');
    // int
    sensorCondition._setRequiredValue(val);
    return sensorCondition;
  }

  changed() {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('dx');
    return sensorCondition;
  }

  changedDelayed(interval: number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('ddx');
    sensorCondition._setRequiredValue(interval);
    return sensorCondition;
  }

  stable(interval: number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('stable');
    sensorCondition._setRequiredValue(interval);
    return sensorCondition;
  }

  notStable(interval: number) {
    const sensorCondition = this._sensorCondition;

    sensorCondition._setOperator('not stable');
    sensorCondition._setRequiredValue(interval);
    return sensorCondition;
  }

  in(interval: string) {
    const sensorCondition = this._sensorCondition;

    //start time, only valid for /config/localtime
    sensorCondition._setOperator('in');
    sensorCondition._setRequiredValue(interval);
    return sensorCondition;
  }

  notIn(interval: string) {
    const sensorCondition = this._sensorCondition;

    // end time, only valid for /config/localtime
    sensorCondition._setOperator('not in');
    sensorCondition._setRequiredValue(interval);
    return sensorCondition;
  }
}