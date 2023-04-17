'use strict';
require('./handler');
const { emitter, eventPool } = require('../eventPool');

describe('Testing Driver: Should log with thank you when event PICKUP and IN TRANSIT is emitted', () => {
  let payload = {store: 'test', orderID: 'test', customer: 'test', address: 'test'};

  console.log = jest.fn();

  test('Console.log should fire up', () => {
    emitter.emit(eventPool[0], payload);
    expect(console.log).toHaveBeenCalled();
  });
});