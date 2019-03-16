
![Coverage lines](coverage/badge-lines.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage branches](coverage/badge-branches.svg)
![Coverage statements](coverage/badge-statements.svg)

## Classes

<dl>
<dt><a href="#EventItem">EventItem</a></dt>
<dd><p>An object which represent an Event
A <code>uuid</code> will be set in order to make the event unique</p>
</dd>
<dt><a href="#Events">Events</a></dt>
<dd><p>Create an event-bus for the application<br/>
It could be used as static class or initialized<br/>
<strong>IMPORTANT!</strong> To use this library and make IE compatible you <strong>MUST</strong> import DOM4 polyfill</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#has">has</a></dt>
<dd><p>Disallow use of Object.prototypes builtins directly</p>
</dd>
</dl>

<a name="EventItem"></a>

## EventItem
An object which represent an Event
A `uuid` will be set in order to make the event unique

**Kind**: global class  
**See**: https://github.com/kelektiv/node-uuid  
<a name="new_EventItem_new"></a>

### new EventItem(event, callback)
Creates an instance of EventItem.


| Param | Type | Description |
| --- | --- | --- |
| event | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the name of the event |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | the callback to exectue |

<a name="Events"></a>

## Events
Create an event-bus for the application<br/>
It could be used as static class or initialized<br/>
**IMPORTANT!** To use this library and make IE compatible you **MUST** import DOM4 polyfill

**Kind**: global class  
**See**: [https://github.com/WebReflection/dom4](https://github.com/WebReflection/dom4)  

* [Events](#Events)
    * [new Events(target)](#new_Events_new)
    * _instance_
        * [.eventTarget](#Events+eventTarget) : [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
        * [.eventTarget](#Events+eventTarget) : [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
        * [.on(name, callback, [...args])](#Events+on) ⇒ [<code>Events</code>](#Events)
        * [.one(name, callback, [...args])](#Events+one) ⇒ [<code>Events</code>](#Events)
        * [.off(name, callback)](#Events+off) ⇒ [<code>Events</code>](#Events)
        * [.trigger(name, [...args])](#Events+trigger) ⇒ [<code>Events</code>](#Events)
    * _static_
        * [.setupEventTarget(target)](#Events.setupEventTarget)
        * [.on(target, name, callback, [options])](#Events.on)
        * [.one(target, name, callback, [options])](#Events.one)
        * [.off(target, [name], [callback])](#Events.off)

<a name="new_Events_new"></a>

### new Events(target)
Set the event handler for a given HtmlElement


| Param | Type | Description |
| --- | --- | --- |
| target | [<code>HTMLElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

**Example**  
```js
import Events from '@openmind/zero-events';
Events.on(targetElement, 'event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
```
<a name="Events+eventTarget"></a>

### events.eventTarget : [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
Set the event target for the event

**Kind**: instance property of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

<a name="Events+eventTarget"></a>

### events.eventTarget : [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
Get the event target for the event

**Kind**: instance property of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

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

### Events.setupEventTarget(target)
Check if given HtmlElement as target has the 'bindedEvents' property<br/>
and it adds if not present it will create a Map for events

**Kind**: static method of [<code>Events</code>](#Events)  
**Throws**:

- [<code>Error</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) Will throw an error if element is not an HtmlElement or jQuery instance

**See**: [https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map)  

| Param | Type | Description |
| --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | an HtmlElement used as target for binding events |

<a name="Events.on"></a>

### Events.on(target, name, callback, [options])
Static method to bind a given event

**Kind**: static method of [<code>Events</code>](#Events)  
**See**: [https://developers.google.com/web/updates/2016/10/addeventlistener-once](https://developers.google.com/web/updates/2016/10/addeventlistener-once)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) |  | an HtmlElement used as target for binding events |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |  |
| [options] | [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | for a list of available options |

<a name="Events.one"></a>

### Events.one(target, name, callback, [options])
Bind only once the event and the callback to the target element

   for polyfill @see [https://github.com/WebReflection/dom4](https://github.com/WebReflection/dom4)

**Kind**: static method of [<code>Events</code>](#Events)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) |  | an HtmlElement used as target for binding events |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) |  | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |  |
| [options] | [<code>object</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [<code>boolean</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | <code>false</code> | for a list of available options |

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
**See**: [https://eslint.org/docs/rules/no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins)  

* * *

&copy; 2019 - openmind
LAB [https://www.openmindonline.it](https://www.openmindonline.it)