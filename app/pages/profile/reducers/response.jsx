import { LOAD_RESPONSE, LOAD_ERROR, SAVE_RESPONSE, SAVE_ERROR } from '../actions.jsx';

export const defaultState = {
    loadError: '',
    saveError: '',
    validEmail: true,
    alreadyRegistered: false,
    validServerAddress: true,
    user: {
        email: '',
        serverAddress: ''
    }
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOAD_RESPONSE:
            return Object.assign({}, state, {
                loadError: '',
                user: action.user
            });
        case LOAD_ERROR:
            return Object.assign({}, state, {
                loadError: 'Oops, the server could not be reached. Please try again later'
            });
        case SAVE_RESPONSE:
            return Object.assign({}, state, {
                saveError: '',
                validEmail: action.response.validEmail,
                alreadyRegistered: action.response.alreadyRegistered,
                validServerAddress: action.response.validServerAddress
            });
        case SAVE_ERROR:
            return Object.assign({}, state, {
                saveError: 'Oops, the server could not be reached. Please try again later',
                validEmail: false,
                alreadyRegistered: true,
                validServerAddress: false
            });
        default:
            return state;
    }
}