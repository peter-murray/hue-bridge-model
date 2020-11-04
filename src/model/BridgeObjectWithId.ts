import BridgeObject  from './BridgeObject';
import Type from '../types/Type';
import HueBridgeModelError from '../HueBridgeModelError';

export type BridgeObjectId = number | string

export default abstract class BridgeObjectWithId extends BridgeObject {

  protected constructor(attributes: Type<any>[], id?: BridgeObjectId) {
    super(attributes);

    // Validate that we have an id definition
    if (!this.attributes.id) {
      throw new HueBridgeModelError('All bridge objects must have an "id" definition');
    }
    this.setAttributeValue('id', id);
  }

  get id(): BridgeObjectId {
    return this.getAttributeValue('id');
  }
};
