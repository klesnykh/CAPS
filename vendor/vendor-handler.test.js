'use strict';
require('./handler');
const { emitter, eventPool } = require('../eventPool');

describe('Testing Vendor: Should log with thank you when event DELIVERED is emitted', () => {
  let payload = {store: 'test', orderID: 'test', customer: 'test', address: 'test'};

  console.log = jest.fn();

  test('Console.log should fire up', () => {
    emitter.emit(eventPool[2], payload);
    expect(console.log).toHaveBeenCalled();
  });
});