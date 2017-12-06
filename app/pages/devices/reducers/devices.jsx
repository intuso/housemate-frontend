import { LOAD_RESPONSE, SERVER_ERROR } from '../actions.jsx';

export const defaultState = {
    byId : {},
    ids: []
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOAD_RESPONSE:
            // todo use "ramda" library and merge functionality.
            // previous problem was byId and ids were the original objects being edited so the references were the same. Now we create new ones, but we lose all data from before.
            var result = {ids : [], byId : {}};
            for (var index in action.response.children) {
                var device = action.response.children[index]
                result.ids.push(device.data.id);
                result.byId[device.data.id] = device;
            }
            return Object.assign({}, state, result);
        case SERVER_ERROR:
            return Object.assign({}, state, {
                error: 'Oops, the server could not be reached. Please try again later'
            });
        default:
            return state;
    }
}