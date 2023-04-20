'use strict';

const { Server } = require('socket.io');
const PackagesQueue = require('./lib/PackagesQueue');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let pickup = new PackagesQueue();
let delivered = new PackagesQueue();

let server = io.of('/caps');
server.on('connection', (socket) => {
  console.log('Client is connected to caps', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.store);
  });

  socket.on('catch-up', (payload) => {
    if(payload.on==='deliveries'){
      if(delivered.read(payload.store)){
        console.log(delivered.read(payload.store));
        Object.keys(delivered.read(payload.store)).forEach(pkg => {
          socket.emit('scanned-delivered', pkg);
        });
      }
      else{console.log('no deliveries');}
    }
    else{//means you are a driver
      console.log(pickup.data);
      if(Object.keys(pickup.data)){
        Object.keys(pickup.data).forEach(store => {
          Object.keys(store).forEach(pkg => {
            socket.emit('pickup', pkg);
          });
        });
      }
    }
  });

  socket.on('pickup', payload => {
    pickup.store(payload.store, payload);

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

  socket.on('scanned-delivered', payload => {
    let scanned = pickup.remove(payload.store);
    delivered.store(scanned.store, scanned);
    server.to(payload.store).emit('scanned-delivered', payload);
    console.log(`EVENT { event: delivered\n`,
      'time: some time\n',
      `payload: \n`, 
      payload);
  });

  socket.on('delivered', payload => {
    console.log('removed: ', delivered.remove(payload.store));
  });

});
