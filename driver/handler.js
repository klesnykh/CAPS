'use strict';

function handlePickup (socket){
  return function (payload){
    socket.emit('join-room', payload.store);
    console.log('DRIVER: picked up ', payload.orderId);
    socket.emit('in-transit', payload);
    console.log('DRIVER: delivered up ', payload.orderId);
    socket.emit('delivered', payload);
  };
}

module.exports = {handlePickup};