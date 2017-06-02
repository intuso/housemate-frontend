import { combineReducers } from 'redux'

import devices from './devices.jsx'
import frontend from './frontend.jsx'

const rootReducer = combineReducers({
    devices,
    frontend
});

const defaultState = {
    devices: devices.defaultState,
    frontend: frontend.defaultState
};

export default rootReducer
