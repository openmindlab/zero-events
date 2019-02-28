const has = Object.prototype.hasOwnProperty;

const extractHandlers = (collection, eventnames) => {
  const getHandlersFromNamespace = (coll) => {
    let ret1 = [coll.handlers];
    for (const section in coll.subevents) {
      if (has.call(coll.subevents, section)) {
        ret1 = ret1.concat(getHandlersFromNamespace(coll.subevents[section]));
      }
    }
    return ret1;
  };

  let ret = [];

  const eventname = eventnames.split('.').shift();
  if (eventname === '') {
    for (const section in collection.subevents) {
      if (has.call(collection.subevents, section)) {
        ret = ret.concat(extractHandlers(collection.subevents[section], eventnames.join('.')));
      }
    }
  } else {
    const section = eventname;
    if (has.call(collection.subevents, section)) {
      ret = ret.concat(getHandlersFromNamespace(collection.subevents[section]));
    }
  }

  return ret;
};

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

class Events {
  static get VERSION() {
    return process.env.VERSION;
  }

  constructor(wrapper) {
    this.__event_target__ = wrapper;
  }

  on(name, callback, ...args) {
    Events.on(this.__event_target__, name, callback, ...args);
    return this;
  }

  one(name, callback, ...args) {
    Events.one(this.__event_target__, name, callback, ...args);
    return this;
  }

  off(name, callback) {
    Events.off(this.__event_target__, name, callback);
    return this;
  }

  trigger(name, ...args) {
    Events.trigger(this.__event_target__, name, ...args);
    return this;
  }

  static get DefaultObject() {
    return { handlers: [], subevents: {} };
  }

  /**
     *
     * @param target
     * @param name
     * @param callback
     * @param args
     */
  static on(target, name, callback, ...args) {
    let __Events__ = target.__Events__ = target.__Events__ || Events.DefaultObject;

    const evt = name.split(' ');
    for (let e of evt) {
      e = e.trim();
      const es = e.split('.');
      let index = 0;
      while (index < es.length - 1) {
        const key = es[index++];
        if (!key) {
          throw `invalid event name ${e}`;
        }
        __Events__.subevents[key] = __Events__.subevents[key] || Events.DefaultObject;
        __Events__ = __Events__.subevents[key];
      }


      let event_object = __Events__.subevents[es[index]];
      if (!event_object) {
        event_object = __Events__.subevents[es[index]] = Events.DefaultObject;
      }

      const { handlers } = event_object;

      callback.__Ref__ = function () {
        const _arg = Array.prototype.slice.call(arguments, 0);
        return callback.apply(target, _arg.concat(args));
      };
      handlers.push(callback);

      if (target.addEventListener) {
        target.addEventListener(es[0], callback.__Ref__, false);
      }
    }
  }


  static one(target, name, callback, ...args) {
    callback.__Ref__ = function () {
      const ret = callback.apply(target, arguments);
      Events.off(target, name, tmp);
      return ret;
    };

    Events.on(target, name, callback.__Ref__, ...args);
  }


  static off(target, name, callback) {
    target.__Events__ = target.__Events__ || Events.DefaultObject;

    name = name || '.';

    let events_to_remove = [];

    if (target.removeEventListener) {
      const names_split = name.split('.');
      if (names_split[0] === '') {
        events_to_remove = Object.keys(target.__Events__.subevents);
      } else {
        events_to_remove = [names_split[0]];
      }
    }

    const handlers = extractHandlers(target.__Events__, name);

    for (let i = handlers.length - 1; i >= 0; i--) {
      const pos = handlers[i];
      for (let j = pos.length - 1; j >= 0; j--) {
        const fn = pos[j];
        if (callback) {
          if (checkFn(fn, callback)) {
            pos.splice(j, 1);
            for (const k of events_to_remove) {
              target.removeEventListener(k, fn.__Ref__ || fn, false);
            }
          }
        } else {
          pos.splice(j, 1);
          for (const k of events_to_remove) {
            target.removeEventListener(k, fn.__Ref__ || fn, false);
          }
        }
      }
    }
  }

  static trigger(target, name, ...args) {
    target.__Events__ = target.__Events__ || Events.DefaultObject;

    const eventnames = name.split('.');
    const handlers = extractHandlers(target.__Events__, name);

    for (const hs of handlers) {
      for (const fn of hs) {
        fn.apply(target, args);
      }
    }
    if (target[eventnames[0]]) {
      // trigger native events
      target[eventnames[0]]();
    }
  }
}

export default Events;
