import {combineReducers} from 'redux';

import cities from './cityReducer'
import customers from './customerReducer'
import orders from './orderReducer'

export default combineReducers({
    cities,
    customers,
    orders
});
