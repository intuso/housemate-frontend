import { combineReducers } from 'redux'

import frontend from './frontend.jsx'
import response from './response.jsx'

const rootReducer = combineReducers({
    frontend,
    response
});

const defaultState = {
    frontend: frontend.defaultState,
    response: response.defaultState
};

export default rootReducer
