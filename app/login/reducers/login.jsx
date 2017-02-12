import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR } from '../actions.jsx';
import isEmpty from 'lodash/isEmpty';

var currentPageParams = new URLSearchParams(window.location.search);
var next = currentPageParams.has('next') ? currentPageParams.get('next') : "../index.html";

export const defaultState = {
    credentials: {
        email: '',
        password: ''
    },
    inProgress: false,
    isAuthenticated: false,
    errors: {
        form: '',
        email: '',
        password: ''
    },
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
                errors: action.errors
            });
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                inProgress: false,
                isAuthenticated: false,
                errors: {
                    form: 'Failed to contact server. Please try again later',
                    email: '',
                    password: ''
                }
            });
        default:
            return state;
    }
}