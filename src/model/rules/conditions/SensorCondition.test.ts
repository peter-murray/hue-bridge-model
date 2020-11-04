import { expect} from 'chai';
import SensorCondition from './SensorCondition';
import * as operators from './operators'
import { createFromBridge } from '../../index';
import RuleCondition from './RuleCondition';
import RuleConditionOperator from './operators/RuleConditionOperator';

describe('SensorCondition', () => {


  // describe('creating invalid conditions', () => {
  //
  //   it('should create an empty condition', () => {
  //     const condition = new SensorCondition();
  //
  //     try {
  //       condition.getRuleCondition();
  //       expect.fail('should not get here');
  //     } catch (err) {
  //       expect(err.message).to.contain('Invalid Condition');
  //     }
  //   });
  //
  // });


  describe('creating valid conditions', () => {

    describe('CLIPOpenClose Sensor', () => {

      const sensor = createFromBridge('clipopenclose', 1, {state: {open: false}});

      it('should create condition for changed', () => {
        const sensorCondition = new SensorCondition(sensor).when('open').changed()
          , ruleCondition = sensorCondition.getRuleCondition()
        ;
        validateRuleCondition(ruleCondition, sensor.id, 'open', operators.Dx);
      });

      it('should create condition for equals', () => {
        const sensorCondition = new SensorCondition(sensor).when('open').equals(true)
          , ruleCondition = sensorCondition.getRuleCondition()
        ;
        validateRuleCondition(ruleCondition, sensor.id, 'open', operators.Equals, true);
      });
    });


    describe('CLIPSwitch Sensor', () => {

      const sensor = createFromBridge('clipswitch', 0, {state: {buttonevent: 0}});

      it('should create condition for changed', () => {
        const sensorCondition = new SensorCondition(sensor).when('buttonevent').changed()
          , ruleCondition = sensorCondition.getRuleCondition()
        ;
        validateRuleCondition(ruleCondition, sensor.id, 'buttonevent', operators.Dx);
      });

      it('should create condition for equals', () => {
        const sensorCondition = new SensorCondition(sensor).when('buttonevent').equals(34)
          , ruleCondition = sensorCondition.getRuleCondition()
        ;
        validateRuleCondition(ruleCondition, sensor.id, 'buttonevent', operators.Equals, 34);
      });
    });

  });


  function validateRuleCondition(ruleCondition: RuleCondition, sensorId: number, attribute: string, operator: RuleConditionOperator, value?: any) {
    const payload = ruleCondition.payload;

    expect(payload).to.have.property('address').to.equal(`/sensors/${sensorId}/state/${attribute}`);
    expect(payload).to.have.property('operator').to.equal(operator.payload);

    if (value !== null && value !== undefined) {
      expect(payload).to.have.property('value').to.equal(`${value}`);
    } else {
      expect(payload).to.not.have.property('value');
    }
  }
});



