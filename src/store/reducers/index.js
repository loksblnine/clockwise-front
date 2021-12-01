import {combineReducers} from 'redux';

import cities from './cityReducer'
import customers from './customerReducer'

export default combineReducers({
    cities,
    customers
});
