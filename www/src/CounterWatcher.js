import React from 'react';
import {socket} from './services';

export default class CounterWatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.counters.forEach(c => this.state[c] = 'waiting...');
  }

  componentDidMount() {
    socket.on('counterChanged', data => {
      if (this.props.counters.includes(data.id)) {
        this.setState({[data.id]: data.delta.is});
      }
    });
    socket.on('counterSubscriptionAdded', data => {
      if (this.props.counters.includes(data.id)) {
        this.setState({[data.id]: data.value});
      }
    });
    this.props.counters.forEach(c => socket.emit('subscribeCounter', c));
  }

  render() {
    let nodes = [];
    Object.keys(this.state).forEach(k => {
      nodes.push((<li key={k}><b>{k}:</b> {this.state[k]}</li>));
    });
    return (
      <div>
        <h4>Watched Counters</h4>
        <p>Watching counters via WebSockets.</p>
        <ul>
          {nodes}
        </ul>
      </div>
    );
  }
}

CounterWatcher.defaultProps = {
  counters: []
};
