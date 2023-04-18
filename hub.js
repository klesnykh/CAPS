'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let server = io.of('/caps');
server.on('connection', (socket) => {
  console.log('Client is connected to caps', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.store);
  });

  socket.on('pickup', payload => {
    socket.broadcast.emit('pickup', payload);
    console.log(`EVENT { event: pickup\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('in-transit', payload => {
    console.log(`EVENT { event: in-transit\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('delivered', payload => {
    server.to(payload.store).emit('delivered', payload);
    console.log(`EVENT { event: delivered\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

});
