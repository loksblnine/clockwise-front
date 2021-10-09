import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import DBStore from "./store/DBStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        DB: new DBStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
