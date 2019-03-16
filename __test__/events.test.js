import $ from 'jquery';
import Events from '../src/events';

const buttonListener = document.createElement('button');
document.body.appendChild(buttonListener);

describe('Manage target element', () => {
  test('it throws an error if no htmlelement has passed as target', () => {
    expect(() => {
      Events.setupEventTarget({});
    }).toThrow();
  });
  test('it return the target element with \'bindedEvents\' object attached even with jQuery selector', () => {
    const selectedButton = $('button');
    const elementTarget = Events.setupEventTarget(selectedButton);
    expect(typeof elementTarget.bindedEvents).toBe('object');
  });

  test('it return the target element with \'bindedEvents\' object attached', () => {
    const elementTarget = Events.setupEventTarget(buttonListener);
    expect(typeof elementTarget.bindedEvents).toBe('object');
  });
});

describe('Static utilization', () => {
  test('execute a callback when event is bound', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('do not execute a callback when event bound is removed', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.off(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('remove all bound events if no event name is specified', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.off(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('execute once the callback method is bound by "one" ', () => {
    const mockCallback = jest.fn(() => {});
    Events.one(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('execute all methods bound by namespace', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click.name1.name2', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, '.name1');
    Events.trigger(buttonListener, '..name2');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
  test('does not execute methods after remove event by namespace', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click.name1.name2', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, '.name1');
    Events.trigger(buttonListener, '..name2');
    Events.off(buttonListener, '..name2');
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, '.name1');
    Events.trigger(buttonListener, '..name2');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
  test('it can removed also a named function', () => {
    const mockCallback = jest.fn(() => {});
    Events.on(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    Events.off(buttonListener, 'click', mockCallback);
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    Events.trigger(buttonListener, 'click');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
});
describe('Dynamic utilization', () => {
  test('execute a callback when event is bound', () => {
    const mockCallback = jest.fn(() => {});
    const events = new Events(buttonListener);
    events.on('click', mockCallback);
    events.trigger('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('do not execute a callback when event bound is removed', () => {
    const mockCallback = jest.fn(() => {});
    const events = new Events(buttonListener);
    events.on('click', mockCallback);
    events.trigger('click');
    events.off('click', mockCallback);
    events.trigger('click');
    events.trigger('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
  test('The same callback has been assigned', () => {
    const mockCallback = jest.fn(() => {});
    const events = new Events(buttonListener);
    events.on('click', mockCallback);
    events.trigger('click');
    events.off('click', mockCallback);
    events.on('mouseenter', mockCallback);
    events.trigger('click');
    events.trigger('click');
    events.trigger('mouseenter');
    events.trigger('mouseenter');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
  test('execute once the callback method is bound by "one" ', () => {
    const mockCallback = jest.fn(() => {});
    const events = new Events(buttonListener);
    events.one('click', mockCallback);
    events.trigger('click');
    events.trigger('click');
    events.trigger('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
