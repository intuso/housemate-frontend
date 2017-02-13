import { combineReducers } from 'redux'

import credentials from './credentials.jsx'
import frontend from './frontend.jsx'
import response from './response.jsx'

const rootReducer = combineReducers({
    credentials,
    frontend,
    response
});

const defaultState = {
    credentials: credentials.defaultState,
    frontend: frontend.defaultState,
    response: response.defaultState
}

export default rootReducer
