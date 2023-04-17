'use strict';

const { emitter, eventPool } = require('../eventPool');

emitter.on(eventPool[0], function(payload) {
  console.log('DRIVER: picked up ', Object.values(payload)[1]);
  emitter.emit(eventPool[1], payload);
  console.log('DRIVER: delivered up ', Object.values(payload)[1]);
  emitter.emit(eventPool[2], payload);
});