import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import configureStore from './configureStore.jsx'
import MainLayout from './components/MainLayout.jsx';

ReactDOM.render(
    <Provider store={configureStore(initialState)}>
        <MainLayout />
    </Provider>,
    document.getElementById('app')
)

const initialState = () => {
    return window.__INITIAL_STATE__
}