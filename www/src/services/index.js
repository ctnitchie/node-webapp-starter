import io from 'socket.io-client';
import * as rpc from 'lwrpc/client';

export const socket = io();

export const httpClient = rpc.HTTPClient('/rpc');
export const socketClient = rpc.SocketClient(socket);

export const httpCounters = rpc.Proxy(httpClient, 'counters', 'inc', 'get', 'set');
export const socketCounters = rpc.Proxy(socketClient, 'counters', 'inc', 'get', 'set');
