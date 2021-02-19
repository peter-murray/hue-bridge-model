import { RuleConditionOperator } from './RuleConditionOperator';

const Equals = new RuleConditionOperator('eq', ['=', '==', 'equals', '==='])
  , Dx = new RuleConditionOperator('dx')
  , Ddx =new RuleConditionOperator('ddx')
  , Stable = new RuleConditionOperator('stable')
  , NotStable = new RuleConditionOperator('not stable')
  , In = new RuleConditionOperator('in')
  , NotIn = new RuleConditionOperator('not in')
  , LessThan = new RuleConditionOperator('lt', ['<'])
  , GreaterThan = new RuleConditionOperator('gt', ['>'])
;

function getOperator(value: RuleConditionOperator | string | null): RuleConditionOperator | null {
  if (value === null) {
    return null;
  }

  if (value instanceof RuleConditionOperator) {
    return value;
  } else {
    let matchedOperator = null;

    if (value) {
      [Equals, Dx, Ddx, Stable, NotStable, In, NotIn, LessThan, GreaterThan].some(operator => {
        if (operator.matches(value)) {
          matchedOperator = operator;
          return true;
        }
      });
    }

    return matchedOperator;
  }
}

const Changed = Dx;
const ChangedDelayed = Ddx;

export {
  Equals,
  Dx,
  Ddx,
  Stable,
  NotStable,
  In,
  NotIn,
  LessThan,
  GreaterThan,

  Changed,
  ChangedDelayed,

  getOperator
}