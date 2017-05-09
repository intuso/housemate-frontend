import { LOAD_REQUEST, LOAD_RESPONSE, SERVER_ERROR } from '../actions.jsx';

export const defaultState = {
    loading: false,
    error: ''
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOAD_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case LOAD_RESPONSE:
        case SERVER_ERROR:
            return Object.assign({}, state, {
                loading: false
            });
        default:
            return state;
    }
}