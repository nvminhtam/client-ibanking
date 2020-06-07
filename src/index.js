import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { store } from './_helpers';
import { App } from './_components/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);