import { createStore, applyMiddleware } from 'redux'
import createLogger  from 'redux-logger'
import thunkMiddleware  from 'redux-thunk'

import rootReducer  from './reducers/rootReducer.jsx'

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )
}
