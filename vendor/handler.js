'use strict';

const { emitter, eventPool } = require('../eventPool');

emitter.on(eventPool[2], function(payload){
  console.log(`VENDOR: Thank you for delivering for ${Object.values(payload)[2]}, order ${Object.values(payload)[1]}`);
});

emitter.emit(eventPool[0], { 
  store: '1-206-flowers',
  orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA',
});


