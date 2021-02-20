import { BridgeObject } from './BridgeObject';
import { BaseType } from '../types';
import { HueBridgeModelError } from '../HueBridgeModelError';

export type BridgeObjectId = number | string

export abstract class BridgeObjectWithId extends BridgeObject {

  protected constructor(attributes: BaseType<any>[], id?: BridgeObjectId) {
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
}
