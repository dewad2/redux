import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, { fetchMessages } from '../store';

export default class MessagesList extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  async componentDidMount() {
    const thunk = fetchMessages();
    store.dispatch(thunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    console.log('messages', messages);
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    );
    console.log('filtered', filteredMessages);
    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}
