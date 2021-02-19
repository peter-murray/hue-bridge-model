export class RuleConditionOperator {

  private readonly type: string;

  private readonly _matchValues: string[];

  constructor(name: string, matchValues? : string[]) {
    this.type = name;

    this._matchValues = [name];
    if (matchValues) {
      this._matchValues = this._matchValues.concat(matchValues);
    }
  }

  matches(value: RuleConditionOperator | string): boolean {
    let matched = false;

    if (value instanceof RuleConditionOperator) {
      return this.type === value.type;
    } else {
      this._matchValues.some(match => {
        if (match === value) {
          matched = true;
          return true;
        }
      });
    }

    return matched;
  }

  get payload(): string {
    return this.type;
  }
}