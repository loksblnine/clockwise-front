import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/index';
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

export default () => {
    const store = createStore(rootReducer, applyMiddleware(logger, thunk));
    return store;
};
