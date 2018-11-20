import { createStore } from 'redux';

//ACTION TYPES

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'ADD_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

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

const initialState = { messages: [], newMessageEntry: '' };

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
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
