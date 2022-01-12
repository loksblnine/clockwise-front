import * as constants from "../../utils/constants";

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
        case constants.ACTIONS.TYPES.SET_TYPES: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        }
        case constants.ACTIONS.TYPES.UPDATE_TYPE: {
            const array = state.items.map((item: any) => {
                if (item.work_id === action.payload.work_id)
                    return action.payload
                else return item
            })
            return {
                ...state,
                items: array,
                isReady: true
            };
        }
        case constants.ACTIONS.TYPES.ADD_TYPE: {
            return {
                items: state.items.concat(action.payload),
                isReady: true
            }
        }
        case constants.ACTIONS.TYPES.DELETE_TYPE: {
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
