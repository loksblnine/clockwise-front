import {combineReducers} from 'redux';

import cities from './cityReducer'
import customers from './customerReducer'
import orders from './orderReducer'
import users from './userReducer'
import masters from './masterReducer'

export default combineReducers({
    cities,
    customers,
    orders,
    users,
    masters
});
