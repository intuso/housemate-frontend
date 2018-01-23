import { REGISTER_REQUEST, REGISTER_RESPONSE, SERVER_ERROR } from '../actions.jsx';

const currentPageParams = new URLSearchParams(window.location.search);
const next = currentPageParams.has('next') ? currentPageParams.get('next') : '../index.html';

export const defaultState = {
    hasSubmitted: false,
    inProgress: false,
    next: next
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                hasSubmitted: true,
                inProgress: true
            });
        case REGISTER_RESPONSE:
        case SERVER_ERROR:
            return Object.assign({}, state, {
                inProgress: false,
            });
        default:
            return state;
    }
}