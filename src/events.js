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
const extractHandlers = (collection, eventNames) => {
  const getHandlersFromNamespace = (coll) => {
    let ret1 = [coll.handlers];
    Object.keys(coll.subevents).forEach((section) => {
      if (has.call(coll.subevents, section)) {
        ret1 = ret1.concat(getHandlersFromNamespace(coll.subevents[section]));
      }
    });
    return ret1;
  };

  let ret = [];
  const eventNamesList = eventNames.split('.');
  const eventname = eventNamesList.shift();
  if (eventname === '') {
    Object.keys(collection.subevents).forEach((section) => {
      if (has.call(collection.subevents, section)) {
        ret = ret.concat(extractHandlers(collection.subevents[section], eventNamesList.join('.')));
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

      callback = callback.__Ref__;
    }

    fn = fn.__Ref__;
  }

  return false;
};

/**
 * Create an event-bus for the application <br/>
 * It could be used as static class or initialized
 * @example
import Events from '@openmind/om-events';
Events.on('event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
 *
 */
class Events {
  /**
   * Per recuperare la versione di build corrente
   * Proviamo ad estenarlizzare
   * @return {string}
   * @constructor
   */
  /* static get VERSION() {
    return process.env.VERSION;
  } */

  /**
   * Default settings for event handler
   * @readonly
   * @return {{handlers: Array, subevents: {}}}
   * @constructor
   */
  static get defaults() {
    return {
      handlers: [],
      subevents: {},
    };
  }

  static get DefaultObject() {
    return Events.defaults;
  }

  static setupEventTarget(wrapper) {
    if (!has.call(wrapper, 'bindedEvents')) {
      Object.defineProperty(wrapper, 'bindedEvents', {
        value: Events.defaults,
        writable: true,
        enumerable: true,
      });
    }
    return wrapper;
  }

  static set eventTarget(wrapper) {
    this.eventTarget = Events.setupEventTarget(wrapper);
  }

  static get eventTarget() {
    return this.eventTarget;
  }

  /**
   * Set the event handler for a given HtmlElement
   * @param {HTMLElement} wrapper
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
   * @param {string} name the event name (could be a string or a dot separated namespace)
   * @param {function} callback
   * @param {*} args
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
   * @param {*} args
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
   * @param {HTMLElement} target
   * @param {string} name
   * @param {function} callback
   * @param {*} args
   * @memberof Events
   */
  static on(target, name, callback, ...args) {
    const definedTarget = this.setupEventTarget(target);
    let { bindedEvents } = definedTarget;
    name.split(' ').forEach((e) => {
      e = e.trim();
      const es = e.split('.');
      let index = 0;
      while (index < es.length - 1) {
        const key = es[index++];
        if (!key) {
          throw new Error(`invalid event name ${e}`);
        }
        bindedEvents.subevents[key] = bindedEvents.subevents[key] || Events.defaults;
        bindedEvents = bindedEvents.subevents[key];
      }
      let eventObject = bindedEvents.subevents[es[index]];
      if (!eventObject) {
        eventObject = bindedEvents.subevents[es[index]] = Events.defaults;
      }

      const { handlers } = eventObject;

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
      Events.off(target, name, callback.__Ref__);
      return ret;
    };

    Events.on(target, name, callback.__Ref__, ...args);
  }


  static off(target, name = '.', callback) {
    const definedTarget = this.setupEventTarget(target);

    let eventsToRemove = [];

    if (definedTarget.removeEventListener) {
      const nameSplit = name.split('.');
      if (nameSplit[0] === '') {
        eventsToRemove = Object.keys(definedTarget.bindedEvents.subevents);
      } else {
        eventsToRemove = [nameSplit[0]];
      }
    }

    const handlers = extractHandlers(definedTarget.bindedEvents, name);

    for (let i = handlers.length - 1; i >= 0; i -= 1) {
      const pos = handlers[i];
      for (let j = pos.length - 1; j >= 0; j -= 1) {
        const fn = pos[j];
        if (callback) {
          if (checkFn(fn, callback)) {
            pos.splice(j, 1);
            eventsToRemove.forEach((singleEvent) => {
              definedTarget.removeEventListener(singleEvent, fn.__Ref__ || fn, false);
            });
          }
        } else {
          pos.splice(j, 1);
          eventsToRemove.forEach((singleEvent) => {
            definedTarget.removeEventListener(singleEvent, fn.__Ref__ || fn, false);
          });
        }
      }
    }
  }

  static trigger(target, name, ...args) {
    target.bindedEvents = target.bindedEvents || Events.defaults;

    const eventnames = name.split('.');
    const handlers = extractHandlers(target.bindedEvents, name);

    if (target[eventnames[0]]) {
      return target[eventnames[0]]();
    }
    handlers.forEach((handler) => {
      handler.forEach((method) => {
        method.apply(target, args);
      });
    });
  }
}

export default Events;
