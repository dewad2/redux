import React, { Component } from 'react';
import store, { createMessage, writeMessage } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleChange(evt) {
    const action = writeMessage(evt.target.value);
    store.dispatch(action);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const content = this.state.newMessageEntry;
    const channelId = this.props.channelId;
    const name = this.state.newNameEntry;
    const thunk = createMessage({ content, channelId, name });
    store.dispatch(thunk);
  }
  render() {
    console.log('store', this.state);
    return (
      <form onSubmit={this.handleSubmit} id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}
