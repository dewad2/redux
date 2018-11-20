import React, { Component } from 'react';
import store, { writeMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';

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
    const content = this.state.NewMessageEntry;
    const channelId = this.props.channelId;
    /* const { data } = await axios.post('/api/messages', {
      content: content,
      channelId: channelId
    });
    const action = gotNewMessageFromServer(data);
    store.dispatch(action); */
    axios
      .post('/api/messages', { content, channelId })
      .then(res => res.data)
      .then(message => store.dispatch(gotNewMessageFromServer(message)))
      .catch(error => {
        console.log(error);
      });
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
