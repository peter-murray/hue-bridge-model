import UInt8Type from '../../types/UInt8Type';
import HueBridgeModelError from '../../HueBridgeModelError';
import stateTypes from './stateTypes';
import Type from '../../types/Type';
import { RangedNumberType } from '../../types/RangedNumberType';

const PERCENTAGE = new UInt8Type({name: 'percentage', min: 0, max: 100})
  , DEGREES = new UInt8Type({name: 'degrees', min: 0, max: 360})
;

type NameToType = { [key: string]: Type<any> }

export default class States {

  private _state: object;

  private _allowedStates: NameToType;

  constructor(attributes: string[]) {
    const states: { [key: string]: Type<any> } = {};

    attributes.forEach(attribute => {
      // @ts-ignore
      const parameter: Type<any> = stateTypes[attribute];
      if (!parameter) {
        throw new HueBridgeModelError(`Unknown Light State Parameter: "${attribute}"`);
      }
      states[attribute] = parameter;
    });

    this._allowedStates = states;
    this._state = {};
  }

  reset(): States {
    this._state = {};
    return this;
  }

  //TODO need to define this data as a type
  getPayload(): object {
    return Object.assign({}, this._state);
  }

  getAllowedStateNames(): string[] {
    //TODO clean this up
    // const names = [];
    //
    // Object.keys(this._allowedStates).forEach(stateDefinition => {
    //   names.push(stateDefinition);
    // });
    //
    // return names;
    return Object.keys(this._allowedStates);
  }

  populate(data: object | null) {
    const self = this;

    if (data) {
      Object.keys(data).forEach(key => {
        if (self._allowedStates[key]) {
          // @ts-ignore
          self._setStateValue(key, data[key]);
        }
      });
    }

    return self;
  }

  protected _setStateValue(definitionName: string, value: any): States {
    const self = this
      , stateDefinition = self._allowedStates[definitionName]
    ;

    if (stateDefinition) {
      // @ts-ignore
      this._state[definitionName] = stateDefinition.getValue(value);
    } else {
      throw new HueBridgeModelError(`Attempted to set a state '${definitionName}' that is not one of the allowed states`);
    }

    return self;
  }

  protected _convertPercentageToStateValue(value: number | string, stateName: string, isFloat?: boolean) {
    return this._convertToStateValue(PERCENTAGE, value, stateName, isFloat);
  }

  protected _convertDegreesToStateValue(value: string | number, stateName: string, isFloat? : boolean) {
    return this._convertToStateValue(DEGREES, value, stateName, isFloat);
  }

  protected _convertToStateValue(range: RangedNumberType, value: string | number, stateName: string, isFloat?: boolean): number | null {
    // @ts-ignore
    const stateDefinition: RangedNumberType = this._allowedStates[stateName]
      , validatedValue: number | null = range.getValue(value)
    ;

    if (validatedValue === null) {
      return null;
    } else if (validatedValue === range.min) {
      return stateDefinition.min;
    } else if (validatedValue === range.max) {
      return stateDefinition.max;
    } else {
      if (isFloat) {
        // @ts-ignore
        return (stateDefinition.getRange() * validatedValue) / range.max;
      }
      return Math.round((stateDefinition.getRange() * validatedValue) / range.max);
    }
  }
};

//TODO consider removing this is test can pass - TypeScript
//TODO this is now in the utils package
// function flatten(array) {
//   const flattened = [];
//   !(function flat(array) {
//     array.forEach(function (el) {
//       if (Array.isArray(el)) flat(el);
//       else flattened.push(el);
//     });
//   })(array);
//   return flattened;
// }