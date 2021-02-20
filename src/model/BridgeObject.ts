import { BaseType } from '../types';
import { AttributeObject, LooseObject } from '../AttributeObject';

export type BridgeObjectJsonData = {
  node_hue_api: {
    type: string,
    version: number,
  },
  [name: string]: any
}

export type BridgeObjectHueData = {
  [name: string]: any,
}


export abstract class BridgeObject extends AttributeObject {

  private populationData: LooseObject | null;

  protected constructor(attributes: BaseType<any>[]) {
    super(attributes);
    this.populationData = null;
  }

  toStringDetailed() {
    let result = `${this.constructor.name}`;

    Object.keys(this.data).forEach(key => {
      result += `\n  ${key}: ${JSON.stringify(this.data[key])}`;
    });

    return result;
  }

  /**
   * Obtains a node-hue-api specific JSON payload of the BridgeObject. This can be used for serialization purposes.
   *
   * This functionality exists to support use cases where server backends need to send data to a web based client to
   * work around CORS or custom backend functionality, whilst preserving and providing reusability of the API objects.
   *
   * @returns {BridgeObjectJsonData} A node-hue-api specific payload that represents the Bridge Object, this can be reconstructed into
   * a valid BridgeObject instance via the model.createFromJson() function.
   */
  getJsonPayload(): BridgeObjectJsonData {
    const data = this._bridgeData;

    data.node_hue_api = {
      type: this.constructor.name.toLowerCase(),
      version: 1
    };

    // @ts-ignore
    return data;
  }

  /**
   * Obtains a Hue API compatible representation of the Bridge Object that can be used over the RESTful API.
   * @returns {BridgeObjectHueData} The payload that is compatible with the Hue RESTful API documentation.
   */
  getHuePayload(): BridgeObjectHueData {
    const result: LooseObject = {};

    Object.keys(this.attributes).forEach(name => {
      const value = this.getAttributeValue(name);
      if (value !== null && value !== undefined) {
        result[name] = value;
      }
    });

    return result;
  }

  // /**
  //  * @returns {any | {}}
  //  * @private
  //  */
  // get _bridgeData() {
  //   // Return a copy so that it cannot be modified from outside
  //   return Object.assign({}, this.data);
  // }

  /**
   * @param data {*}
   * @returns {BridgeObject}
   * @private
   */
  _populate(data: LooseObject) {
    const self = this;

    //TODO Maybe need to support api data and bridge data separately in this call, but treat as the same for now

    if (data) {
      Object.keys(data).forEach(key => {
        if (self.attributes[key]) {
          self.setAttributeValue(key, data[key]);
        }
      });
    }

    // Store this so we can do a diff on it later to help with support of new devices and changes in the API results in the future
    this.populationData = data;

    return self;
  }
}
