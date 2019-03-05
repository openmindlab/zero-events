import Events from '../src/events';

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

const eventsBtn1 = new Events(btn1);
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
