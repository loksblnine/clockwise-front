import {ACTIONS} from "../../Utils/constants";

const initialState = {
    isReady: false,
    doctorsFeedbacks: [],
    patientsFeedbacks: [],
};

const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FEEDBACK.SET_DOCTORS_FEEDBACK_LIST: {
            return {
                ...state,
                doctorsFeedbacks: action.payload,
                isReady: true,
            }
        }
        case ACTIONS.FEEDBACK.SET_PATIENTS_FEEDBACK_LIST: {
            return {
                ...state,
                patientsFeedbacks: action.payload,
                isReady: true,
            }
        }
        default:
            return state;
    }
};

export default feedbackReducer;