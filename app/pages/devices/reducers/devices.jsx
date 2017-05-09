import { LOAD_RESPONSE, SERVER_ERROR } from '../actions.jsx';

export const defaultState = {
    byId : {},
    ids: [],
};

export default (state = defaultState, action = {}) => {
    switch(action.type) {
        case LOAD_RESPONSE:
            var result = Object.assign({}, state);
            result.ids.append(action.devices.map(device => device.id));
            for(device in action.devices)
                result.byId[device.id] = device;
            return result;
        case SERVER_ERROR:
            return Object.assign({}, state, {
                error: 'Oops, the server could not be reached. Please try again later'
            });
        default:
            return state;
    }
}