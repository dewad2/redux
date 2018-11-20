import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

//ACTION TYPES

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'ADD_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const NEW_NAME_ENTRY = 'NEW_NAME_ENTRY';

//ACTION CREATORS
export const gotMessagesFromServer = messages => {
  return { type: GOT_MESSAGES_FROM_SERVER, messages };
};
export const writeMessage = message => {
  return { type: WRITE_MESSAGE, message };
};
export const gotNewMessageFromServer = message => {
  return { type: GOT_NEW_MESSAGE_FROM_SERVER, message };
};
export const newNameEntry = name => {
  return { type: NEW_NAME_ENTRY, name };
};

//THUNK CREATORS
export const fetchMessages = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/messages');
    const action = gotNewMessageFromServer(data);
    dispatch(action);
  };
};

export function createMessage(message) {
  console.log('heeeeeeer', message);
  return function(dispatch) {
    return axios
      .post('/api/messages', message)
      .then(res => res.data)
      .then(message => {
        console.log('inside', message);
        const action = gotNewMessageFromServer(message);
        dispatch(action);
        socket.emit('new-message', message);
      })
      .catch(err => {
        console.error(('error creating message', err));
      });
  };
}

const initialState = { messages: [], newMessageEntry: '', newNameEntry: '' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, ...state, { messages: action.messages });
    case WRITE_MESSAGE:
      return Object.assign({}, ...state, { newMessageEntry: action.message });
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, ...state, {
        messages: [...state.messages, action.message]
      });
    case NEW_NAME_ENTRY:
      return Object.assign({}, ...state, { newNameEntry: action.name });
    default:
      return state;
  }
};

const middleWare = applyMiddleware(loggerMiddleware, thunkMiddleware);
/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, middleWare);
/* eslint-enable */
export default store;
