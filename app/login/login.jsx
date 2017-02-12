import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import createLogger  from 'redux-logger'
import thunkMiddleware  from 'redux-thunk'

import LoginLayout from './components/LoginLayout.jsx';
import login  from './reducers/login.jsx'

let store = createStore(
    login,
    login.defaultState,
    applyMiddleware(thunkMiddleware, createLogger())
);

ReactDOM.render(
    <Provider store={store}>
        <LoginLayout />
    </Provider>,
    document.getElementById('app')
);