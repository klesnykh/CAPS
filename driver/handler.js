'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';

let driverSocket = io(SERVER_URL + '/caps');

driverSocket.on('pickup', payload => {
  driverSocket.emit('join-room', payload.store);
  console.log('DRIVER: picked up ', payload.orderId);
  driverSocket.emit('in-transit', payload);
  console.log('DRIVER: delivered up ', payload.orderId);
  driverSocket.emit('delivered', payload);
});