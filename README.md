### Table of Contents

-   [has][1]
-   [Events][2]
    -   [Parameters][3]
    -   [Examples][4]
    -   [eventTarget][5]
        -   [Parameters][6]
    -   [eventTarget][7]
        -   [Parameters][8]
    -   [on][9]
        -   [Parameters][10]
        -   [Examples][11]
    -   [one][12]
        -   [Parameters][13]
    -   [off][14]
        -   [Parameters][15]
        -   [Examples][16]
    -   [trigger][17]
        -   [Parameters][18]
    -   [defaults][19]
    -   [defaults][20]
    -   [setupEventTarget][21]
        -   [Parameters][22]
    -   [on][23]
        -   [Parameters][24]
    -   [one][25]
        -   [Parameters][26]
    -   [off][27]
        -   [Parameters][28]

## has

-   **See: [https://eslint.org/docs/rules/no-prototype-builtins][29]**

Disallow use of Object.prototypes builtins directly

## Events

Create an event-bus for the application <br/>
It could be used as static class or initialized

### Parameters

-   `wrapper` **[HTMLElement][30]** an HtmlElement used as target for binding events

### Examples

```javascript
import Events from '@openmind/om-events';
Events.on('event', callback());

const targetElement = document.createElement('div');
cont eventManager = new Events(targetElement);
eventManager.on('event', callback());
```

### eventTarget

#### Parameters

-   `wrapper` **[HtmlElement][30]** an HtmlElement used as target for binding events

### eventTarget

#### Parameters

-   `wrapper` **[HtmlElement][30]** an HtmlElement used as target for binding events

### on

Bind an event for a given HtmlElement selector <br/>
It could be used with a single named event or with a concatenation of namespaces

#### Parameters

-   `name` **[string][31]** the event name (could be a string or a dot separated namespace)
-   `callback` **[function][32]**
-   `args` **any?**

#### Examples

```javascript
Events.on(target, 'eventname', function callback() {});
Events.on(target, 'eventname.namespace', function callback() {});
Events.on(target, 'eventname.namespace.subspace', function callback() {});
Events.on(target, 'eventname.namespace otherevent.namespace', function callback() {});
```

Returns **[Events][33]**

### one

Bind an event for a given selector and removes it
after the first event callback execution

#### Parameters

-   `name` **[string][31]** the event name (could be a string or a dot separated namespace)
-   `callback` **[function][32]**
-   `args` **any?**

Returns **[Events][33]**

### off

Remove the event binded
for a specific HtmlElement &lt; br / >
It could remove a single named event or a portion namespaced event

#### Parameters

-   `name` **[string][31]** the event name (could be a string or a dot separated namespace)
-   `callback` **[function][32]**

#### Examples

```javascript
Events.off(target, 'eventname');
Events.off(target, 'eventname', callback);
Events.off(target, 'eventname.namespace');
Events.off(target, '.namespace');
```

Returns **[Events][33]**

### trigger

Fire specific event

#### Parameters

-   `name` **[string][31]** the event name(could be a string or a dot separated namespace)
-   `args` **any?**

Returns **[Events][33]**

### defaults

Per recuperare la versione di build corrente
Proviamo ad estenarlizzare

Returns **[string][31]**

### defaults

Default settings for event handler

Returns **{handlers: [Array][34], subevents: {}}**

### setupEventTarget

Check if given HtmlElement as wrapper has the 'bindedEvents' property<br/>
and it adds if not present

#### Parameters

-   `wrapper` **[HtmlElement][30]** an HtmlElement used as target for binding events

### on

Static method to bind a given event

#### Parameters

-   `target` **[HtmlElement][30]** an HtmlElement used as target for binding events
-   `name` **[string][31]** the event name (could be a string or a dot separated namespace)
-   `callback` **[function][32]**
-   `args` **any?**


-   Throws **[Error][35]** Error

### one

Bind only once the event and the callback to the target element

#### Parameters

-   `target` **[HtmlElement][30]** an HtmlElement used as target for binding events
-   `name` **[string][31]** the event name (could be a string or a dot separated namespace)
-   `callback` **[function][32]**
-   `args` **any?**

Returns **void**

### off

#### Parameters

-   `target` **[HtmlElement][30]** an HtmlElement used as target for binding events
-   `name` **[string][31]** the event name (could be a string or a dot separated namespace) (optional, default `.`)
-   `callback` **any?**

[1]: #has

[2]: #events

[3]: #parameters

[4]: #examples

[5]: #eventtarget

[6]: #parameters-1

[7]: #eventtarget-1

[8]: #parameters-2

[9]: #on

[10]: #parameters-3

[11]: #examples-1

[12]: #one

[13]: #parameters-4

[14]: #off

[15]: #parameters-5

[16]: #examples-2

[17]: #trigger

[18]: #parameters-6

[19]: #defaults

[20]: #defaults-1

[21]: #setupeventtarget

[22]: #parameters-7

[23]: #on-1

[24]: #parameters-8

[25]: #one-1

[26]: #parameters-9

[27]: #off-1

[28]: #parameters-10

[29]: https://eslint.org/docs/rules/no-prototype-builtins

[30]: https://developer.mozilla.org/docs/Web/HTML/Element

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[33]: #events

[34]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[35]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error