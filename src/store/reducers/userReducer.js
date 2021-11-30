import * as constants from "../../constants";

const initialState = {
    isReady: false,
    user: {
        role: "",
        email: "",
        token: ""
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.ACTIONS.USER.SET_USER: {
            return {
                ...state,
                user: action.payload,
                isReady: true
            };
        }
        case constants.ACTIONS.USER.SET_READY_USER:
            return {
                ...state,
                isReady: action.payload
            };
        default:
            return state;
    }
};
