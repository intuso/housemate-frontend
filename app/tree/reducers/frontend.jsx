import { LOAD_REQUEST, LOAD_RESPONSE, SERVER_ERROR } from '../actions.jsx';
import { ActionTypes } from "redux-simple-websocket";

export const defaultState = {
    listening: false,
    listeningError : '',
    loading: false,
    loadingError: ''
};

export default (state = defaultState, action = {}) => {
    let result = {};
    switch(action.type) {
        case ActionTypes.WEBSOCKET_CONNECTED:
            result.listening = true;
            break;
        case ActionTypes.WEBSOCKET_ERROR:
            result.listening = false;
            result.listeningError = action.error;
            break;
        case LOAD_REQUEST:
            result.loading = true;
            break;
        case LOAD_RESPONSE:
            result.loading = false;
            break;
        case SERVER_ERROR:
            result.loadingError = 'Oops, the server could not be reached. Please try again later';
            break;
    }
    return Object.assign({}, state, result);
}