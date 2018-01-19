import { combineReducers } from 'redux'

import tree from '../../../tree/reducers/tree.jsx'
import frontend from '../../../tree/reducers/frontend.jsx'

const rootReducer = combineReducers({
    tree,
    frontend
});

const defaultState = {
    tree: tree.defaultState,
    frontend: frontend.defaultState
};

export default rootReducer
