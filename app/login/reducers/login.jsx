import { LOGIN_REQUEST, LOGIN_RESPONSE, SERVER_ERROR } from '../actions.jsx';

var currentPageParams = new URLSearchParams(window.location.search);
var next = currentPageParams.has('next') ? currentPageParams.get('next') : "../index.html";

export const defaultState = {
    credentials: {
        email: '',
        password: ''
    },
    inProgress: false,
    isAuthenticated: false,
    error: '',
    onSuccess: next
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                credentials: action.credentials,
                inProgress: true,
            });
        case LOGIN_RESPONSE:
            return Object.assign({}, state, {
                inProgress: false,
                isAuthenticated: action.user !== null,
                error: action.error
            });
        case SERVER_ERROR:
            return Object.assign({}, state, {
                inProgress: false,
                isAuthenticated: false,
                error: 'Failed to contact server. Please try again later'
            });
        default:
            return state;
    }
}