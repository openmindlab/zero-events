## Classes

<dl>
<dt><a href="#Events">Events</a></dt>
<dd><p>Create an event-bus for the application
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
Create an event-bus for the application
It could be used as static class or initialized

**Kind**: global class  

* [Events](#Events)
    * [new Events(wrapper)](#new_Events_new)
    * _instance_
        * [.on(name, callback, ...args)](#Events+on) ⇒ [<code>Events</code>](#Events)
        * [.one(name, callback, ...args)](#Events+one) ⇒ [<code>Events</code>](#Events)
        * [.off(name, callback)](#Events+off) ⇒ [<code>Events</code>](#Events)
        * [.trigger(name, ...args)](#Events+trigger) ⇒ [<code>Events</code>](#Events)
    * _static_
        * [.VERSION](#Events.VERSION)
            * [new Events.VERSION()](#new_Events.VERSION_new)
        * [.DefaultObject](#Events.DefaultObject)
            * [new Events.DefaultObject()](#new_Events.DefaultObject_new)

<a name="new_Events_new"></a>

### new Events(wrapper)
Set the event handler for a given HtmlElement


| Param | Type |
| --- | --- |
| wrapper | <code>HTMLElement</code> | 

<a name="Events+on"></a>

### events.on(name, callback, ...args) ⇒ [<code>Events</code>](#Events)
Bind an event for a given HtmlElement selector
It could be used with a single named event or with a concatenation of namespaces

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the event name |
| callback | <code>function</code> |  |
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
| name | <code>string</code> | the event name |
| callback | <code>function</code> |  |
| ...args | <code>\*</code> |  |

<a name="Events+off"></a>

### events.off(name, callback) ⇒ [<code>Events</code>](#Events)
Remove the event binded for a specific HtmlElement
It could remove a single named event or a portion namespaced event

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
Events.off(target, 'eventname');
Events.off(target, 'eventname', callback);
Events.off(target, 'eventname.namespace');
Events.off(target, '.namespace');
```
<a name="Events+trigger"></a>

### events.trigger(name, ...args) ⇒ [<code>Events</code>](#Events)
Trigger specific event

**Kind**: instance method of [<code>Events</code>](#Events)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| ...args | <code>\*</code> | 

<a name="Events.VERSION"></a>

### Events.VERSION
**Kind**: static class of [<code>Events</code>](#Events)  
<a name="new_Events.VERSION_new"></a>

#### new Events.VERSION()
Per recuperare la versione di build corrente
Proviamo ad estenarlizzare

<a name="Events.DefaultObject"></a>

### Events.DefaultObject
**Kind**: static class of [<code>Events</code>](#Events)  
<a name="new_Events.DefaultObject_new"></a>

#### new Events.DefaultObject()
Da verificare se possiamo cambiare il nome

<a name="has"></a>

## has
Disallow use of Object.prototypes builtins directly

**Kind**: global constant  
**See**: https://eslint.org/docs/rules/no-prototype-builtins  
