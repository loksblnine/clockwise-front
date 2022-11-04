import {ACTIONS} from "../../Utils/constants";

const initialState = {
    message: null,
    error: null
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MESSAGE.SET_MESSAGE: {
            return {
                ...state,
                message: action.payload
            }
        }
        case ACTIONS.MESSAGE.SET_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state;
    }
};

export default messageReducer;