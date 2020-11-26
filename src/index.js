import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from "./components/main";

import { Provider } from 'react-redux'
import store from './store/store';




ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>, document.getElementById('root')
);
