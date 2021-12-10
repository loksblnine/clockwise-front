import * as constants from "../../constants";

type initialState = {
    isReady: boolean,
    items: any[]
}

const initialState: initialState = {
    isReady: false,
    items: []
};

const cityReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.CITIES.SET_CITIES: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        }
        case constants.ACTIONS.CITIES.UPDATE_CITY: {
            const array = state.items.filter((item: any) => item.city_id !== action.payload[0].city_id).concat(action.payload[0])
            return {
                ...state,
                items: array,
                isReady: true
            };
        }
        case constants.ACTIONS.CITIES.SET_READY_CITIES: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.CITIES.ADD_CITY: {
            return {
                items: state.items.concat(action.payload),
                isReady: true
            }
        }
        case constants.ACTIONS.CITIES.DELETE_CITY: {
            return {
                items: state.items.filter((item: any) => item.city_id !== action.payload),
                isReady: true
            }
        }
        default:
            return state;
    }
};
export default cityReducer