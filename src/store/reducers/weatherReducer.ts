import * as constants from "../../utils/constants";
import {ACTIONS} from "../../utils/constants";

type initialState = {
    letItSnow: boolean
}

const initialState: initialState = {
    letItSnow: false
};

const weatherReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case ACTIONS.WEATHER.SET_WINTER: {
            return {
                letItSnow: action.payload
            }
        }
        default:
            return state;
    }
}

export default weatherReducer
