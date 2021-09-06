import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";

export const Context = createContext(null)
console.log(process.env.NODE_ENV)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Context.Provider>,
    document.getElementById('root')
);
