import * as types from "../../actionTypes";

const defaultState = {
  loaded: false,
  message: "Just created",
  connected: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SOCKETS_CONNECTING:
      return {
        loaded: true,
        message: "Connecting...",
        connected: false
      };
    case types.SOCKETS_CONNECTED:
      return {
        loaded: true,
        message: "Connected",
        connected: true
      };
    case types.SOCKETS_DISCONNECTING:
      return {
        loaded: true,
        message: "Disconnecting...",
        connected: true
      };
    case types.SOCKETS_DISCONNECTED:
      return {
        loaded: true,
        message: "Disconnected",
        connected: false
      };
    case types.SOCKETS_MESSAGE_SENDING:
      return {
        loaded: true,
        message: action.messageSend,
        connected: true
      };
    case types.SOCKETS_MESSAGE_RECEIVING:
      return {
        loaded: true,
        message: action.messageReceive,
        connected: true
      };
    default:
      return state;
  }
};
