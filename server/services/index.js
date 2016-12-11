import * as rpc from 'lwrpc/server';
import Router from 'express';
import counterService from './counters';

const serviceManager = new rpc.ServiceManager();
serviceManager.registerService('counters', counterService);

function initServiceRoutes(app) {
  app.use('/rpc', rpc.expressBinding(Router(), {serviceManager}));
}

function initServiceSockets(io) {
  rpc.socketioBinding(io, {serviceManager});

  counterService.on('counterChanged', (id, delta) => {
    io.to('counters.' + id).emit('counterChanged', {id, delta});
  });

  io.on('connection', (socket) => {
    socket.on('subscribeCounter', counter => {
      socket.join('counters.' + counter);
      socket.emit('counterSubscriptionAdded', {id: counter, value: counterService.get(counter) || 0});
    });
    socket.on('unsubscribeCounter', counter => {
      socket.leave('counters.' + counter);
      socket.emit('counterSubscriptionRemoved', counter);
    });
  });
}

export default serviceManager;
export {initServiceRoutes, initServiceSockets, serviceManager};
