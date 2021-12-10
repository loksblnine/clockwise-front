import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../store/reducers/index';
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

const store = () => {
    return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default store
