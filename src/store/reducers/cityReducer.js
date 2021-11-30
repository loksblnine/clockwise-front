import * as constants from "../../constants";

const initialState = {
    isReady: false,
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.ACTIONS.CITIES.SET_CITIES: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        }
        case constants.ACTIONS.CITIES.SET_READY_CITY:
            return {
                ...state,
                isReady: action.payload
            };
        default:
            return state;
    }
};
