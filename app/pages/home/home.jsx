import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './configureStore.jsx'
import Layout from './components/Layout.jsx';

ReactDOM.render(
    <Provider store={configureStore(initialState)}>
        <Layout />
    </Provider>,
    document.getElementById('app')
)

const initialState = () => {
    return window.__INITIAL_STATE__
}