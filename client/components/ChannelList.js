import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

export default class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.messageCount = this.messageCount.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  messageCount(channelId) {
    const filteredMessages = this.state.messages.filter(
      message => message.channelId === channelId
    );
    return filteredMessages.length;
  }

  render() {
    console.log('messages', this.state.messages);
    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span># really_random</span>
            <span className="badge">{this.messageCount(1)}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge">{this.messageCount(2)}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active">
            <span># dogs_of_fullstack</span>
            <span className="badge">{this.messageCount(3)}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
            <span className="badge">{this.messageCount(4)}</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
