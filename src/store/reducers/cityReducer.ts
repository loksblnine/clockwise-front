import {ACTIONS} from "../../utils/constants";

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
        case ACTIONS.CITIES.SET_CITIES: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        }
        case ACTIONS.CITIES.UPDATE_CITY: {
            const array = state.items.map((item: any) => {
                if (item.city_id === action.payload.city_id)
                    return action.payload
                else return item
            })
            return {
                ...state,
                items: array,
                isReady: true
            };
        }
        case ACTIONS.CITIES.SET_READY_CITIES: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case ACTIONS.CITIES.ADD_CITY: {
            return {
                items: state.items.concat(action.payload),
                isReady: true
            }
        }
        case ACTIONS.CITIES.DELETE_CITY: {
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
