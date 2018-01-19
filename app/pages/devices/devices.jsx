import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createSimpleWebSocketMiddleware } from "redux-simple-websocket"
import thunkMiddleware  from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Layout from './components/Layout.jsx';
import rootReducer from './reducers/rootReducer.jsx'

let store = createStore(
    rootReducer,
    rootReducer.defaultState,
    applyMiddleware(createSimpleWebSocketMiddleware(), thunkMiddleware, createLogger())
);

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('app')
);