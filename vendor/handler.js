'use strict';

function generatePayload () {
  let payload = {
    store: '1-206-flowers',
    orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Jamal Braun',
    address: 'Schmittfort, LA',
  };
  return payload;
}

function handleDelivered (payload) {
  console.log(`VENDOR: Thank you for delivering for ${payload.customer}, order ${payload.orderId}`);
}

function sendPickup(socket, payload){
  socket.emit('pickup', payload);
}

module.exports = {generatePayload, handleDelivered, sendPickup};