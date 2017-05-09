import { LOGIN_RESPONSE, SERVER_ERROR } from '../actions.jsx';

export const defaultState = {
    error: '',
    validEmail: false,
    knownEmail: false,
    validPassword: false,
    correctPassword: false
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOGIN_RESPONSE:
            return Object.assign({}, state, {
                error: '',
                validEmail: action.response.validEmail,
                knownEmail: action.response.knownEmail,
                validPassword: action.response.validPassword,
                correctPassword: action.response.correctPassword
            });
        case SERVER_ERROR:
            return Object.assign({}, state, {
                error: 'Oops, the server could not be reached. Please try again later',
                validEmail: false,
                knownEmail: false,
                validPassword: false,
                correctPassword: false
            });
        default:
            return state;
    }
}