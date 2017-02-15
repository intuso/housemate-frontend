import { REGISTER_RESPONSE, SERVER_ERROR } from '../actions.jsx';

export const defaultState = {
    error: '',
    validEmail: false,
    alreadyRegistered: true,
    validPassword: false,
    success: false
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case REGISTER_RESPONSE:
            return Object.assign({}, state, {
                error: '',
                validEmail: action.response.validEmail,
                alreadyRegistered: action.response.alreadyRegistered,
                validPassword: action.response.validPassword,
                success: action.response.success
            });
        case SERVER_ERROR:
            return Object.assign({}, state, {
                error: 'Oops, the server could not be reached. Please try again later',
                validEmail: false,
                alreadyRegistered: true,
                validPassword: false,
                success: false
            });
        default:
            return state;
    }
}