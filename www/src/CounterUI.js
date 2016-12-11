import React from 'react';
import autoBind from 'react-autobind';
import {httpCounters as counters} from './services';

export default class CounterUI extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {message: 'Initializing', disabled: true};
  }

  async componentDidMount() {
    let data = await this.props.counterService.get(this.props.counter);
    this.setState({message: data, disabled: false});
  }

  render() {
    return (
      <div>
        <h4>{this.props.label}</h4>
        <p>Controlling counter "{this.props.counter}"</p>
        <p>
          <button onClick={this.click} className="btn btn-default" disabled={this.state.disabled}>Increment by {this.props.incby}</button>
        </p>
        <p>Current value: {this.state.message}</p>
      </div>
    );
  }

  async click() {
    this.setState({disabled: true});
    let data = await this.props.counterService.inc(this.props.counter, this.props.incby);
    this.setState({message: data.is, disabled: false});
  }
}

CounterUI.defaultProps = {
  counterService: counters,
  counter: 'http',
  label: 'Counters',
  incby: 2
};
