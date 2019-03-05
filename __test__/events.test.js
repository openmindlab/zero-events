import Events from '../src/events';

describe('Static utilization', () => {
  test('execute a callback when event is binded', () => {
    const listener = document.createElement('div');
    const mockCallback = jest.fn(() => {});
    Events.on(listener, 'click', mockCallback);
    Events.trigger(listener, 'click');
    Events.trigger(listener, 'click');
    Events.trigger(listener, 'click');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
  test('do not execute a callback when event binded is removed', () => {
    const listener = document.createElement('div');
    const mockCallback = jest.fn(() => {});
    Events.one(listener, 'click', mockCallback);
    Events.trigger(listener, 'click');
    Events.trigger(listener, 'click');
    Events.trigger(listener, 'click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
