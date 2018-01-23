import { LOAD_REQUEST, LOAD_RESPONSE, LOAD_ERROR, SAVE_REQUEST, SAVE_RESPONSE, SAVE_ERROR } from '../actions.jsx';

const currentPageParams = new URLSearchParams(window.location.search);
const next = currentPageParams.has('next') ? currentPageParams.get('next') : '../index.html';

export const defaultState = {
    loading: true,
    saving: false,
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOAD_REQUEST:
            return Object.assign({}, state, {
                loading: true,
            });
        case LOAD_RESPONSE:
        case LOAD_ERROR:
            return Object.assign({}, state, {
                loading: false
            });
        case SAVE_REQUEST:
            return Object.assign({}, state, {
                saving: true,
            });
        case SAVE_RESPONSE:
        case SAVE_ERROR:
            return Object.assign({}, state, {
                saving: false
            });
        default:
            return state;
    }
}