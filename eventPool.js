'use strict';

const Events = require('events');
const eventEmitter = new Events();

const eventPool = [
  'pickup',
  'in-transit',
  'delivered',
];

module.exports = {
  eventPool: eventPool,
  emitter: eventEmitter,
};
