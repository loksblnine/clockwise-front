import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import createStore from './store/store';
import {Provider} from "react-redux";

const store = createStore();
export const Context = createContext(null)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
