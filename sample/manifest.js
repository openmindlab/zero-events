import Events from '../src/events';

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');


let increment = 0;

function mockCallback() {
  console.log('click');
  increment += 1;
  console.log(increment);
}


Events.one(btn1, 'click', mockCallback.bind(this));
/* Events.on(btn1, 'click.pippo', mockCallback.bind(this));
Events.on(btn1, 'click.pippo.pluto', mockCallback.bind(this));
Events.on(btn1, 'click.paperino', mockCallback.bind(this));
Events.trigger(btn1, 'click');

Events.off(btn1, 'click', mockCallback); */

Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');
Events.trigger(btn1, 'click');

Object.defineProperty(mockCallback, 'reference', {
  value() {
    console.log('ciao');
  },
  enumerable: true,
});
console.log(mockCallback);


/* const eventsBtn1 = new Events(btn1);
const eventsBtn2 = new Events(btn2);

function btn1Click() {
  console.log('click');
  eventsBtn1.off('click');
}

function btn2Click() {
  console.log('click');
}

eventsBtn1.on('click', btn1Click);
eventsBtn2.on('click', btn2Click);


Events.on(eventsBtn1, 'click', btn2Click);
Events.trigger(eventsBtn1, 'click');
Events.trigger(eventsBtn1, 'click');
Events.trigger(eventsBtn1, 'click');
 */
