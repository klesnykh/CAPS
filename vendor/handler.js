'use strict';

'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';

let vendorSocket = io(SERVER_URL + '/caps');

let payload = {
  store: '1-206-flowers',
  orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA',
};

vendorSocket.emit('join-room', payload);

vendorSocket.on('delivered', function(payload){
  console.log(`VENDOR: Thank you for delivering for ${payload.orderId}, order ${payload.orderId}`);
});

vendorSocket.emit('pickup', payload);
