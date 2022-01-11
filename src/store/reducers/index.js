import {combineReducers} from 'redux';

import cities from './cityReducer'
import customers from './customerReducer'
import orders from './orderReducer'
import users from './userReducer'
import masters from './masterReducer'
import articles from './blogReducer'
import weather from './weatherReducer'
import types from './typeReducer'

const appReducer = combineReducers({
    cities,
    customers,
    orders,
    users,
    masters,
    articles,
    weather,
    types
});

const rootReducer = (state, action) => {
    if (action.type === "LOG_OUT") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
