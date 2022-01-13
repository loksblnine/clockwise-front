import * as constants from "../../utils/constants";

type initialState = {
    letItSnow: boolean
}

const initialState: initialState = {
    letItSnow: false
};

const weatherReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.WEATHER.SET_WINTER: {
            return {
                letItSnow: action.payload
            }
        }
        default:
            return state;
    }
}

export default weatherReducer
