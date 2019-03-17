import {
  v4 as uuid,
} from 'uuid';

const has = Object.prototype.hasOwnProperty;

/**
 * An object which represent an Event
 * A `uuid` will be set in order to make the event unique
 * @see https://github.com/kelektiv/node-uuid
 * @param {string} event the name of the event
 * @param {function} callback the callback to exectue
 */
class EventItem {
  /**
   *Creates an instance of EventItem.
   * @param {string} event
   * @param {Function} callback
   * @memberof EventItem
   */
  constructor(event, callback) {
    if (!has.call(callback, 'uuid')) {
      const callbackUuid = uuid();
      Object.defineProperty(callback, 'uuid', {
        value: callbackUuid,
        enumerable: true,
      });
    }
    this.uuid = callback.uuid;
    this.event = event;
    this.callback = callback;
  }
}
export default EventItem;
