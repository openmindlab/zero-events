import Events from '../src/events';

describe('Static utilization', () => {
  test('execute a callback when event `click` is triggered', () => {
    const listener = document.createElement('div');
    const mockCallback = jest.fn(() => {});
    Events.on(listener, 'click', mockCallback);
    Events.trigger('click');
    Events.trigger('click');
    Events.trigger('click');
    expect(mockCallback.mock.calls.length).toBe(3);
  });
});
