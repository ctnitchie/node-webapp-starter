import React from 'react';
import CounterUI from './CounterUI';
import CounterWatcher from './CounterWatcher';
import {socketCounters, httpCounters} from './services';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Express+Socket.io+React+Bootstrap Starter</h1>
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <CounterUI counterService={httpCounters} label="HTTP Counter"
                    counter="http" incby="5"/>
              </div>
              <div className="col-sm-4 col-xs-12">
                <CounterUI counterService={socketCounters}
                    label="WebSocket Counter"
                    counter="socket" incby="2"/>
              </div>
              <div className="col-sm-4 col-xs-12">
                <CounterWatcher counters={['http', 'socket', 'neverUpdated']}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
