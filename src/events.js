import {
  v4 as uuid,
} from 'uuid';
import EventItem from './event-item';
import '@babel/polyfill';


/**
 * Disallow use of Object.prototypes builtins directly
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 */
const has = Object.prototype.hasOwnProperty;
/**
 * Create an event-bus for the application <br/>
 * It could be used as static class or initialized
 * @example
import Events from '@openmind/zero-events';
Events.on(targetElement, 'event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
 *
 */
class Events {
  /**
   * Check if given HtmlElement as wrapper has the 'bindedEvents' property<br/>
   * and it adds if not present it will create a Map for events
   * @see https: //developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map
   * IMPORTANT! To use this library and make IE compatible you MUST import DOM4 polyfill
   * @see https: //github.com/WebReflection/dom4
   * @param {HtmlElement} wrapper an HtmlElement used as target for binding events
   */
  static setupEventTarget(wrapper) {
    if (!has.call(wrapper, 'bindedEvents')) {
      Object.defineProperty(wrapper, 'bindedEvents', {
        value: new Map(),
        writable: true,
        enumerable: true,
      });
    }
    return wrapper;
  }

  /**
   * @param {HtmlElement} wrapper an HtmlElement used as target for binding events
   */
  set eventTarget(wrapper) {
    this.eventTargetElement = Events.setupEventTarget(wrapper);
  }

  /**
   * @param {HtmlElement} wrapper an HtmlElement used as target for binding events
   */
  get eventTarget() {
    return this.eventTargetElement;
  }

  /**
   * Set the event handler for a given HtmlElement
   * @param {HTMLElement} wrapper an HtmlElement used as target for binding events
   */
  constructor(wrapper) {
    this.eventTarget = wrapper;
  }

  /**
   * Bind an event for a given HtmlElement selector <br/>
   * It could be used with a single named event or with a concatenation of namespaces
   * @example
Events.on(target, 'eventname', function callback() {});
Events.on(target, 'eventname.namespace', function callback() {});
Events.on(target, 'eventname.namespace.subspace', function callback() {});
Events.on(target, 'eventname.namespace otherevent.namespace', function callback() {});
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @param {*} [args]
   * @return {Events}
   */
  on(name, callback, ...args) {
    Events.on(this.eventTarget, name, callback, ...args);
    return this;
  }

  /**
   * Bind an event for a given selector and removes it
   * after the first event callback execution
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @param {*} [args]
   * @return {Events}
   */
  one(name, callback, ...args) {
    Events.one(this.eventTarget, name, callback, ...args);
    return this;
  }

  /**
   * Remove the event binded
   for a specific HtmlElement < br / >
   * It could remove a single named event or a portion namespaced event
   * @example
Events.off(target, 'eventname');
Events.off(target, 'eventname', callback);
Events.off(target, 'eventname.namespace');
Events.off(target, '.namespace');
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @return {Events}
   */
  off(name, callback) {
    Events.off(this.eventTarget, name, callback);
    return this;
  }

  /**
   * Fire specific event
   * @param {string} name the event name(could be a string or a dot separated namespace)
   * @param {*} [args]
   * @return {Events}
   */
  trigger(name, ...args) {
    Events.trigger(this.eventTarget, name, ...args);
    return this;
  }

  /**
   * Static method to bind a given event
   * @static
   * @throws {Error} Error
   * @param {HtmlElement} target an HtmlElement used as target for binding events
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @param {object|boolean} [options = false] for a list of available options @see https: //developers.google.com/web/updates/2016/10/addeventlistener-once
   * @memberof Events
   */
  static on(target, name, callback, options = false) {
    const definedTarget = this.setupEventTarget(target);
    if (!definedTarget.bindedEvents.has(name)) {
      definedTarget.bindedEvents.set(name, []);
    }
    const mappedEvent = definedTarget.bindedEvents.get(name);
    const eventItem = new EventItem(name, callback);
    mappedEvent.push(eventItem);
    definedTarget.addEventListener(name, callback, options);
  }

  /**
   * Bind only once the event and the callback to the target element
   *
   for polyfill @see https: //github.com/WebReflection/dom4
   * @static
   * @param {HtmlElement} target an HtmlElement used as target for binding events
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @param {object | boolean} [options = false] for a list of available options @see https: //developers.google.com/web/updates/2016/10/addeventlistener-once
   * @returns {void}
   * @memberof Events
   */
  static one(target, name, callback, options) {
    const newOptions = Object.assign({}, options, {
      once: true,
    });
    Events.on(target, name, callback, newOptions);
  }

  /**
   *
   *
   * @static
   * @param {HtmlElement} target an HtmlElement used as target for binding events
   * @param {string} [name=.] the event name (could be a string or a dot separated namespace)
   * @param {function} [callback]
   * @memberof Events
   */
  static off(target, name = '.', callback) {
    const definedTarget = this.setupEventTarget(target);
    definedTarget.bindedEvents.forEach((value, key) => {
      if (key.match(name)) {
        if (typeof callback === 'undefined') {
          value.forEach((callbacks) => {
            definedTarget.removeEventListener(key, callbacks);
            definedTarget.bindedEvents.delete(key);
          });
        } else if (typeof callback !== 'undefined' && has.call(callback, 'uuid')) {
          value.forEach((callbacks, index) => {
            if (callbacks.uuid === callback.uuid) {
              definedTarget.removeEventListener(key, callback);
              definedTarget.bindedEvents.get(key).splice(index, 1);
            }
          });
        }
      }
    });
  }


  static trigger(target, name, options) {
    const definedTarget = this.setupEventTarget(target);

    definedTarget.bindedEvents.forEach((value, key) => {
      if (key.match(name)) {
        const detail = Object.assign({}, {
          detail: {},
        }, {
          detail: options,
        });
        const customEvent = new CustomEvent(key, detail);
        definedTarget.dispatchEvent(customEvent);
      }
    });
  }
}

export default Events;
