import {combineReducers} from "redux";
import userReducer from "./userReducer";
import doctorReducer from "./doctorReducer";
import adminReducer from "./adminReducer";
import clinicReducer from "./clinicReducer";
import specialtyReducer from "./specialtyReducer";
import feedbackReducer from "./feedbackReducer";
import appointmentReducer from "./appointmentReduser";
import messageReducer from "./messageReducer";

const appReducer = combineReducers({
    userReducer,
    doctorReducer,
    adminReducer,
    clinicReducer,
    specialtyReducer,
    feedbackReducer,
    appointmentReducer,
    messageReducer
});

const rootReducer = (state, action) => {
    if (action.type === "LOG_OUT") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;