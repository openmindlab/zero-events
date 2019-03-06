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
        * [.eventTarget](#Events+eventTarget) ⇒ [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
        * [.on(name, callback, ...args)](#Events+on) ⇒ [<code>Events</code>](#Events)
        * [.one(name, callback, ...args)](#Events+one) ⇒ [<code>Events</code>](#Events)
        * [.off(name, callback)](#Events+off) ⇒ [<code>Events</code>](#Events)
        * [.trigger(name, ...args)](#Events+trigger) ⇒ [<code>Events</code>](#Events)
    * _static_
        * [.defaults](#Events.defaults)
            * [new Events.defaults()](#new_Events.defaults_new)
        * [.setupEventTarget(wrapper)](#Events.setupEventTarget)
        * [.on(target, name, callback, ...args)](#Events.on)

<a name="new_Events_new"></a>

### new Events(wrapper)
Set the event handler for a given HtmlElement


| Param | Type |
| --- | --- |
| wrapper | [<code>HTMLElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | 

**Example**  
```js
import Events from '@openmind/om-events';
Events.on('event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
```
<a name="Events+eventTarget"></a>

### events.eventTarget
**Kind**: instance property of [<code>Events</code>](#Events)  

| Param | Type |
| --- | --- |
| wrapper | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | 

<a name="Events+eventTarget"></a>

### events.eventTarget ⇒ [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element)
**Kind**: instance property of [<code>Events</code>](#Events)  
<a name="Events+on"></a>

### events.on(name, callback, ...args) ⇒ [<code>Events</code>](#Events)
Bind an event for a given HtmlElement selector <br/>
It could be used with a single named event or with a concatenation of namespaces

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |
| ...args | <code>\*</code> |  |

**Example**  
```js
Events.on(target, 'eventname', function callback() {});
Events.on(target, 'eventname.namespace', function callback() {});
Events.on(target, 'eventname.namespace.subspace', function callback() {});
Events.on(target, 'eventname.namespace otherevent.namespace', function callback() {});
```
<a name="Events+one"></a>

### events.one(name, callback, ...args) ⇒ [<code>Events</code>](#Events)
Bind an event for a given selector and removes it
after the first event callback execution

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name (could be a string or a dot separated namespace) |
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) |  |
| ...args | <code>\*</code> |  |

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

### events.trigger(name, ...args) ⇒ [<code>Events</code>](#Events)
Fire specific event

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | the event name(could be a string or a dot separated namespace) |
| ...args | <code>\*</code> |  |

<a name="Events.defaults"></a>

### Events.defaults
**Kind**: static class of [<code>Events</code>](#Events)  
**Read only**: true  
<a name="new_Events.defaults_new"></a>

#### new Events.defaults()
Default settings for event handler

<a name="Events.setupEventTarget"></a>

### Events.setupEventTarget(wrapper)
Check if given HtmlElement as wrapper has the 'bindedEvents' property<br/>
and it adds if not present

**Kind**: static method of [<code>Events</code>](#Events)  

| Param | Type |
| --- | --- |
| wrapper | [<code>HtmlElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | 

<a name="Events.on"></a>

### Events.on(target, name, callback, ...args)
Static method to bind a given event

**Kind**: static method of [<code>Events</code>](#Events)  
**Throws**:

- [<code>Error</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) Error


| Param | Type |
| --- | --- |
| target | [<code>HTMLElement</code>](https://developer.mozilla.org/docs/Web/HTML/Element) | 
| name | [<code>string</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | 
| callback | [<code>function</code>](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | 
| ...args | <code>\*</code> | 

<a name="has"></a>

## has
Disallow use of Object.prototypes builtins directly

**Kind**: global constant  
**See**: https://eslint.org/docs/rules/no-prototype-builtins  
