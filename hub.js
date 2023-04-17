'use strict';

const { emitter, eventPool } = require('./eventPool');

const state = {
  store: 'store name',
  orderId: 'order id',
  customer: 'customer',
  address: 'address',
};

eventPool.forEach(event => {
  emitter.on(event, (payload) => {
    console.log(`EVENT { event: ${event}\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);

    emitter.emit('UPDATE_STATE', payload);
  });
});

//update state when hub sees en event, hub sees and logs every event
emitter.on('UPDATE_STATE', (payload) => {
  Object.keys(payload).forEach(property => {
    state[property] = payload[property];
  });
});
require('./driver/handler'); // execute the code in driver, this code emits the event
require('./vendor/handler'); // execute the code in vendor, this code emits the event