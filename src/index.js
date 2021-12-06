import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import createStore from './store/store';
import {Provider} from "react-redux";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
