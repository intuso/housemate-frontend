import { LOGIN_REQUEST, LOGIN_RESPONSE, SERVER_ERROR } from '../actions.jsx';

var currentPageParams = new URLSearchParams(window.location.search);
var next = currentPageParams.has('next') ? currentPageParams.get('next') : '../index.html';

export const defaultState = {
    hasSubmitted: false,
    inProgress: false,
    next: next
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                hasSubmitted: true,
                inProgress: true
            });
        case LOGIN_RESPONSE:
        case SERVER_ERROR:
            return Object.assign({}, state, {
                inProgress: false,
            });
        default:
            return state;
    }
}