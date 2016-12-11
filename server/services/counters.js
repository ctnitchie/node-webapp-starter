import EventEmitter from 'events';
import {ServiceManager} from 'lwrpc/server';

const counters = {};

class CounterManager extends EventEmitter {
  constructor() {
    super();
  }

  get(id) {
    return counters[id] || 0;
  }

  set(id, val) {
    let old = counters[id];
    counters[id] = val;
    let result = {was: old || 0, is: val};
    this.emit('counterChanged.' + id, result);
    this.emit('counterChanged', id, result);
    return result;
  }

  inc(id, by=1) {
    return this.set(id, (counters[id] || 0) + parseInt(by));
  }
}

const instance = new CounterManager();
ServiceManager.registerService('counters', instance);

export default instance;
