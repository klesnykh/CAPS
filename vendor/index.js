'use strict';

const { io } = require('socket.io-client');
const SERVER_URL = process.env.PORT || 'http://localhost:3001';
const {handleDelivered, generatePayload, sendPickup} = require('./handler');
let vendorSocket = io(SERVER_URL + '/caps');

vendorSocket.emit('join-room', generatePayload());

vendorSocket.on('delivered', handleDelivered);

//vendorSocket.emit('pickup', generatePayload());
sendPickup(vendorSocket, generatePayload());