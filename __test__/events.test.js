import Events from '../src/events';

const buttonListener = document.createElement('button');

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
  test('it throws an error if namespace is passed without parent parameter ', () => {
    const mockCallback = jest.fn(() => {});
    expect(() => {
      Events.on(buttonListener, '.click', mockCallback);
    }).toThrowError();
  });
  test('class default params could be called both by "defaults" and "DefaultObject"', () => {
    const {
      defaults,
    } = Events;
    const {
      DefaultObject,
    } = Events;
    expect(defaults).toEqual(DefaultObject);
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
