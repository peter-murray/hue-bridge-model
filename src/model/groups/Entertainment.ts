
import Group from './Group';
import StringType from '../../types/StringType';
import ObjectType from '../../types/ObjectType';
import ChoiceType from '../../types/ChoiceType';
import BooleanType from '../../types/BooleanType';
import ListType from '../../types/ListType';

const ATTRIBUTES = [
  new StringType({name: 'type', defaultValue: 'Entertainment'}),
  // iOS Hue application is defaulting the types to TV currently, also only TV and Other seem to work out of all the classes
  new ChoiceType({name: 'class', defaultValue: 'TV', validValues: ['TV', 'Other']}),
  new ObjectType({
    name: 'stream',
    types: [
      new StringType({name: 'proxymode'}),
      new StringType({name: 'proxynode'}),
      new BooleanType({name: 'active'}),
      new StringType({name: 'owner'}),
    ]
  }),
  new ObjectType({name: 'locations'}),
  new ListType({name: 'lights', minEntries: 0, entryType: new StringType({name: 'lightId'})}),
];

/**
 * A Group of lights that can be utilized in an Entertainment situation for streaming.
 *
 * There are limitations on which lights can be added to an Entertainment Group, as they need to support the ability
 * to stream, which requires newer lights in the hue ecosystem.
 *
 * @type {Entertainment}
 */
export default class Entertainment extends Group {

  constructor(id?: number | string) {
    super(ATTRIBUTES, id);
  }

  set lights(value) {
    this.setAttributeValue('lights', value);
  }

  get lights(): string[] {
    return this.getAttributeValue('lights');
  }

  set class(value: string) {
    this.setAttributeValue('class', value);
  }

  get class(): string {
    return this.getAttributeValue('class');
  }

  /**
   * Obtains details of the stream on the Entertainment Group.
   *
   * @typedef Stream
   * @type {object}
   * @property proxymode {string}
   * @property proxynode {string}
   * @property active {boolean} The status of whether or not the stream is active
   * @property owner {string} The owner (user id) of the stream if it is active
   *
   * @returns @type {Stream}
   */
  get stream() {
    return this.getAttributeValue('stream');
  }

  // TODO consider unpacking this in to something more user friendly
  get locations(): object {
    return this.getAttributeValue('locations');
  }
};
