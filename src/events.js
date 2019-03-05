import {
  v4 as uuid,
} from 'uuid';

/**
 * Disallow use of Object.prototypes builtins directly
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 */
const has = Object.prototype.hasOwnProperty;
/**
 * Extract all the handlers for a specific namespace
 * Recoursive method
 * @private
 * @param collection
 * @param eventnames
 * @return {Array}
 */
const extractHandlers = (collection, eventnames) => {
  const getHandlersFromNamespace = (coll) => {
    let ret1 = [coll.handlers];
    coll.subevents.forEach((section) => {
      if (has.call(coll.subevents, section)) {
        ret1 = ret1.concat(getHandlersFromNamespace(coll.subevents[section]));
      }
    });
    return ret1;
  };
  let ret = [];
  const eventname = eventnames.split('.').shift();
  if (eventname === '') {
    collection.subevent.forEach((section) => {
      if (has.call(collection.subevents, section)) {
        ret = ret.concat(extractHandlers(collection.subevents[section], eventnames.join('.')));
      }
    });
  } else {
    const section = eventname;
    if (has.call(collection.subevents, section)) {
      ret = ret.concat(getHandlersFromNamespace(collection.subevents[section]));
    }
  }
  return ret;
};
/**
 * @private
 * @param fn
 * @param callback
 * @return {boolean}
 */
const checkFn = (fn, callback) => {
  const chkFn = callback;
  while (fn) {
    callback = chkFn;
    while (callback) {
      if (callback === fn) {
        return true;
      }
      callback.uuid = uuid();
    }
    fn = fn.__Ref__;
  }
  return false;
};

/**
 * Create an event-bus for the application
 * @example
 ```js
import Events from '@openmind/om-events';
```
 *
 */
class Events {
  /**
   * Per recuperare la versione di build corrente
   * Proviamo ad estenarlizzare
   * @return {string}
   * @constructor
   */
  static get VERSION() {
    return process.env.VERSION;
  }

  /**
   * Da verificare se possiamo cambiare il nome
   * @return {{handlers: Array, subevents: {}}}
   * @constructor
   */
  static get DefaultObject() {
    return {
      handlers: [],
      subevents: {},
    };
  }

  /**
   * Set the event handler for a given HtmlElement
   * @param {HTMLElement} wrapper
   */
  constructor(wrapper) {
    this.eventTarget = wrapper;
  }

  /**
   * Bind an event for a given HtmlElement selector
   * It could be used with a single named event or with a concatenation of namespaces
   * @example
   Events.on(target, 'eventname', function callback() {});
   Events.on(target, 'eventname.namespace', function callback() {});
   Events.on(target, 'eventname.namespace.subspace', function callback() {});
   Events.on(target, 'eventname.namespace otherevent.namespace', function callback() {});
   * @param {string} name the event name
   * @param {function} callback
   * @param {*} args
   * @return {Events}
   */
  on(name, callback, ...args) {
    Events.on(this.eventTarget, name, callback, ...args);
    return this;
  }

  /**
   * Bind an event for a given selector and removes it
   * after the first event callback execution
   * @param {string} name the event name
   * @param {function} callback
   * @param {*} args
   * @return {Events}
   */
  one(name, callback, ...args) {
    Events.one(this.eventTarget, name, callback, ...args);
    return this;
  }

  /**
   * Remove the event binded for a specific HtmlElement
   * It could remove a single named event or a portion namespaced event
   * @example
   Events.off(target, 'eventname');
   Events.off(target, 'eventname', callback);
   Events.off(target, 'eventname.namespace');
   Events.off(target, '.namespace');
   * @param {string} name
   * @param {function} callback
   * @return {Events}
   */
  off(name, callback) {
    Events.off(this.eventTarget, name, callback);
    return this;
  }

  /**
   * Trigger specific event
   * @param {string} name
   * @param {*} args
   * @return {Events}
   */
  trigger(name, ...args) {
    Events.trigger(this.eventTarget, name, ...args);
    return this;
  }

  static on(target, name, callback, ...args) {
    let bindedEvents = target.bindedEvents || Events.DefaultObject;
    const evt = name.split(' ');
    evt.forEach((e) => {
      const es = e.trim().split('.');
      let index = 0;
      while (index < es.length - 1) {
        const key = es[index += 1];
        if (!key) {
          throw `invalid event name ${e}`;
        }
        bindedEvents.subevents[key] = bindedEvents.subevents[key] || Events.DefaultObject;
        bindedEvents = bindedEvents.subevents[key];
      }
      let eventObject = bindedEvents.subevents[es[index]];
      if (!eventObject) {
        eventObject = Events.DefaultObject;
        bindedEvents.subevents[es[index]] = Events.DefaultObject;
      }
      const {
        handlers,
      } = eventObject;
      callback.__Ref__ = function () {
        const _arg = Array.prototype.slice.call(arguments, 0);
        return callback.apply(target, _arg.concat(args));
      };
      handlers.push(callback);
      if (target.addEventListener) {
        target.addEventListener(es[0], callback.__Ref__, false);
      }
    });
  }

  static one(target, name, callback, ...args) {
    callback.__Ref__ = function () {
      const ret = callback.apply(target, arguments);
      Events.off(target, name, tmp);
      return ret;
    };
    Events.on(target, name, callback.__Ref__, ...args);
  }

  static off(target = Events.DefaultObject, name = '.', callback) {
    let eventsToRemove = [];
    const nameSplit = name.split('.');
    if (nameSplit[0] === '') {
      eventsToRemove = Object.keys(target.bindedEvents.subevents);
    } else {
      eventsToRemove = [nameSplit[0]];
    }
    const handlers = extractHandlers(target.bindedEvents, name);
    for (let i = handlers.length - 1; i >= 0; i -= 1) {
      const pos = handlers[i];
      for (let j = pos.length - 1; j >= 0; j--) {
        const fn = pos[j];
        if (callback) {
          if (checkFn(fn, callback)) {
            pos.splice(j, 1);
            eventsToRemove.forEach((removedEvent) => {
              target.removeEventListener(removedEvent, fn.__Ref__ || fn, false);
            });
          }
        } else {
          pos.splice(j, 1);
          eventsToRemove.forEach((removedEvent) => {
            target.removeEventListener(removedEvent, fn.__Ref__ || fn, false);
          });
        }
      }
    }
  }

  static trigger(target = Events.DefaultObject, name, ...args) {
    const eventnames = name.split('.');
    const handlers = extractHandlers(target.bindedEvents, name);
    handlers.forEach((handler) => {
      handler.forEach((method) => {
        method.apply(target, args);
      });
    });
    if (target[eventnames[0]]) {
      target[eventnames[0]]();
    }
  }
}

export default Events;
