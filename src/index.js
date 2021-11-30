import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import UserStore from "./store/UserStore";
import DBStore from "./store/DBStore";
import createStore from './store/store';
import {Provider} from "react-redux";

const store = createStore();
export const Context = createContext(null)

ReactDOM.render(
    <Provider store={store}>
        <Context.Provider value={{
            user: new UserStore(),
            DB: new DBStore()
        }}>
            <App/>
        </Context.Provider>
    </Provider>,
    document.getElementById('root')
);
