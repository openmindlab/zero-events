import Events from '../src/events';

console.log( Events.VERSION );

let counter = 0;
const reset = () => {counter = 0;};
const fn_static = () => {
  counter++;
};

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

btn1.addEventListener('click', () => {
  reset();
  setTimeout( () => {
    console.log( 'Test click 1', counter === 2 );
    reset();
  });
}, false);

btn2.addEventListener('click', () => {
  reset();
  setTimeout( () => {
    console.log( 'Test click 2', counter === 2 );
    reset();
  });
}, false);

function test1() {
  const _Events = Events;

  const fn = () => {
    return fn_static.bind(null);
  };

  _Events.on( btn1, 'click', fn() );
  _Events.on( btn1, 'click.namespace', fn() );
  _Events.on( btn1, 'click.name.space', fn_static );
  _Events.one( btn1, 'click.namespace.space', fn() );

  try {
    _Events.on( btn1, '.namespace', fn() );
  } catch (e) {
    console.log("cought :)");
  }

  _Events.on( btn1, 'myevt', fn() );
  _Events.one( btn1, 'myevt.namespace', fn() );
  _Events.on( btn1, 'myevt.name.space', fn() );


  _Events.trigger( btn1, 'click' );
  console.log( 'Test 1', counter === 4 );
  reset();

  _Events.trigger( btn1, 'click' );
  console.log( 'Test 2', counter === 3 );
  reset();

  _Events.trigger( btn1, '.namespace' );
  console.log( 'Test 3', counter === 2 );
  reset();

  _Events.trigger( btn1, '.space' );
  console.log( 'Test 4', counter === 0 );
  reset();

  _Events.trigger( btn1, '..space' );
  console.log( 'Test 5', counter === 2 );
  reset();

  _Events.off( btn1, '.name.space', fn_static );
  _Events.trigger( btn1, '..space' );
  console.log( 'Test 6', counter === 1 );
}

function test2() {
  const _Events = new Events(btn2);

  const fn = () => {
    return fn_static.bind(null);
  };

  _Events.on( 'click', fn() );
  _Events.on( 'click.namespace', fn() );
  _Events.on( 'click.name.space', fn_static );
  _Events.one( 'click.namespace.space', fn() );

  try {
    _Events.on( '.namespace', fn() );
  } catch (e) {
    console.log("cought :)");
  }

  _Events.on( 'myevt', fn() );
  _Events.one( 'myevt.namespace', fn() );
  _Events.on( 'myevt.name.space', fn() );


  _Events.trigger( 'click' );
  console.log( 'Test 1', counter === 4 );
  reset();

  _Events.trigger( 'click' );
  console.log( 'Test 2', counter === 3 );
  reset();

  _Events.trigger( '.namespace' );
  console.log( 'Test 3', counter === 2 );
  reset();

  _Events.trigger( '.space' );
  console.log( 'Test 4', counter === 0 );
  reset();

  _Events.trigger( '..space' );
  console.log( 'Test 5', counter === 2 );
  reset();

  _Events.off( '.name.space', fn_static );
  _Events.trigger( '..space' );
  console.log( 'Test 6', counter === 1 );
}

test1();
test2();
