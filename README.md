# Events
Simple events management for all object/HTML elements

##Code style

This project uses the AirBnb code style

Refer to https://github.com/airbnb/javascript

##### Usage
Events exposes static methods
```js
import Events from '@openmind/om-events';
```

### on / one
Attach events to `target` object
```js
Events.on( target, 'eventname', function callback() {});
Events.one( target, 'eventname', function callback() {});
```
You can also use attach more than one event per time. You can use namespaces, too
```js
Events.on( target, 'eventname.namespace', function callback() {});
Events.on( target, 'eventname.namespace.subspace', function callback() {});
Events.on( target, 'eventname.namespace otherevent.namespace', function callback() {});
```

### off
Detach event from `target` object
```js
Events.off( target, 'eventname'); // detach all event-callbacks associated to given `eventname`
Events.off( target, 'eventname', callback); // detach given event-callback to given `eventname`
Events.off( target, 'eventname.namespace'); detach all event-callback associated to given `eventname` with given `namespace`
Events.off( target, '.namespace'); detach all events-callbacks with given 'namespace'
```

### trigger
Trigger event to `target` object
```js
Events.trigger( target, 'eventname'); // detach all event-callbacks associated to given `eventname`
Events.trigger( target, 'eventname', callback); // detach given event-callback to given `eventname`
Events.trigger( target, 'eventname.namespace'); detach all event-callback associated to given `eventname` with given `namespace`
Events.trigger( target, '.namespace'); detach all events-callbacks with given 'namespace'
```

### Dynamic methods
You can use dynamic methods
```js
const eventObject = new Events(target);
```
### Standard methods
Use all previous methods such as
```js
eventObject.on('eventname', function callback() {});
```
