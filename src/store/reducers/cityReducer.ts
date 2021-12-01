import * as constants from "../../constants";

const initialState = {
    isReady: false,
    items: []
};

export default (state: { isReady: boolean, items: any [] } = initialState, action: any) => {
    switch (action.type) {
        case constants.ACTIONS.CITIES.SET_CITIES: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        }
        case constants.ACTIONS.CITIES.UPDATE_CITY: {
            return {
                ...state,
                items: action.payload,
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
                items: Object.assign(state.items, action.payload),
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
