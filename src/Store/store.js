import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger"

import rootReducer from "../Store/reducers/index";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
});

export default store;
