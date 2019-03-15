## Classes

<dl>
<dt><a href="#Events">Events</a></dt>
<dd><p>Create an event-bus for the application <br/>
It could be used as static class or initialized</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#has">has</a></dt>
<dd><p>Disallow use of Object.prototypes builtins directly</p>
</dd>
</dl>

<a name="Events"></a>

## Events
Create an event-bus for the application <br/>
It could be used as static class or initialized

**Kind**: global class  

* [Events](#Events)
    * [new Events(wrapper)](#new_Events_new)
    * _instance_
        * [.eventTarget](#Events+eventTarget)
        * [.eventTarget](#Events+eventTarget)
        * [.on(name, callback, [...args])](#Events+on) ⇒ [<code>Events</code>](#Events)
        * [.one(name, callback, [...args])](#Events+one) ⇒ [<code>Events</code>](#Events)
        * [.off(name, callback)](#Events+off) ⇒ [<code>Events</code>](#Events)
        * [.trigger(name, [...args])](#Events+trigger) ⇒ [<code>Events</code>](#Events)
    * _static_
        * [.setupEventTarget(wrapper)](#Events.setupEventTarget)
        * [.on(target, name, callback, [options])](#Events.on)
        * [.one(target, name, callback, [options])](#Events.one) ⇒ <code>void</code>
        * [.off(target, [name], [callback])](#Events.off)

<a name="new_Events_new"></a>

### new Events(wrapper)
Set the event handler for a given HtmlElement


| Param | Type | Description |
| --- | --- | --- |
| wrapper | [<code>HTMLElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

**Example**  
```js
import Events from '@openmind/zero-events';
Events.on(targetElement, 'event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
```
<a name="Events+eventTarget"></a>

### events.eventTarget
**Kind**: instance property of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

<a name="Events+eventTarget"></a>

### events.eventTarget
**Kind**: instance property of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

<a name="Events+on"></a>

### events.on(name, callback, [...args]) ⇒ [<code>Events</code>](#Events)
Bind an event for a given HtmlElement selector <br/>
It could be used with a single named event or with a concatenation of namespaces

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |
| [...args] | <code>\*</code> |  |

**Example**  
```js
Events.on(target, 'eventname', function callback() {});
Events.on(target, 'eventname.namespace', function callback() {});
Events.on(target, 'eventname.namespace.subspace', function callback() {});
Events.on(target, 'eventname.namespace otherevent.namespace', function callback() {});
```
<a name="Events+one"></a>

### events.one(name, callback, [...args]) ⇒ [<code>Events</code>](#Events)
Bind an event for a given selector and removes it
after the first event callback execution

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |
| [...args] | <code>\*</code> |  |

<a name="Events+off"></a>

### events.off(name, callback) ⇒ [<code>Events</code>](#Events)
Remove the event binded
   for a specific HtmlElement < br / >
It could remove a single named event or a portion namespaced event

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |

**Example**  
```js
Events.off(target, 'eventname');
Events.off(target, 'eventname', callback);
Events.off(target, 'eventname.namespace');
Events.off(target, '.namespace');
```
<a name="Events+trigger"></a>

### events.trigger(name, [...args]) ⇒ [<code>Events</code>](#Events)
Fire specific event

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name(could be a string or a dot separated namespace) |
| [...args] | <code>\*</code> |  |

<a name="Events.setupEventTarget"></a>

### Events.setupEventTarget(wrapper)
Check if given HtmlElement as wrapper has the 'bindedEvents' property<br/>
and it adds if not present it will create a Map for events

**Kind**: static method of [<code>Events</code>](#Events)  
**See**

- https: //developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map
IMPORTANT! To use this library and make IE compatible you MUST import DOM4 polyfill
- https: //github.com/WebReflection/dom4


| Param | Type | Description |
| --- | --- | --- |
| wrapper | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

<a name="Events.on"></a>

### Events.on(target, name, callback, [options])
Static method to bind a given event

**Kind**: static method of [<code>Events</code>](#Events)  
**Throws**:

- [<code>Error</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) Error


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) |  | an HtmlElement used as target for binding events |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |  |
| [options] | [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | for a list of available options @see https: //developers.google.com/web/updates/2016/10/addeventlistener-once |

<a name="Events.one"></a>

### Events.one(target, name, callback, [options]) ⇒ <code>void</code>
Bind only once the event and the callback to the target element

   for polyfill @see https: //github.com/WebReflection/dom4

**Kind**: static method of [<code>Events</code>](#Events)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) |  | an HtmlElement used as target for binding events |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |  |
| [options] | [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | for a list of available options @see https: //developers.google.com/web/updates/2016/10/addeventlistener-once |

<a name="Events.off"></a>

### Events.off(target, [name], [callback])
**Kind**: static method of [<code>Events</code>](#Events)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) |  | an HtmlElement used as target for binding events |
| [name] | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | <code>&quot;.&quot;</code> | the event name (could be a string or a dot separated namespace) |
| [callback] | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |  |

<a name="has"></a>

## has
Disallow use of Object.prototypes builtins directly

**Kind**: global constant  
**See**: https://eslint.org/docs/rules/no-prototype-builtins  
