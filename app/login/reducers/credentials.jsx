import { LOGIN_REQUEST } from '../actions.jsx';

export const defaultState = {
    email: '',
    password: ''
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                email: action.credentials.email,
                password: action.credentials.password,
            });
        default:
            return state;
    }
}