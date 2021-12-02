import * as constants from "../../constants";

type initialState = {
    isReady: boolean,
    items: any[]
    page: number,
    loadNext: boolean
}

const initialState: initialState = {
    isReady: false,
    items: [],
    page: 0,
    loadNext: true,
};
export default (state: initialState = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.ORDERS.SET_ORDERS: {
            if (action.payload.length < 10) {
                return {
                    ...state,
                    items: state.items.concat(action.payload),
                    isReady: true,
                    loadNext: false
                }
            }
            return {
                ...state,
                items: state.items.concat(action.payload),
                isReady: true,
                page: state.page + 1
            };
        }
        case constants.ACTIONS.ORDERS.UPDATE_ORDER: {
            const array = state.items.filter((item: any) => item.order_id !== action.payload.order_id).concat(action.payload)
            return {
                ...state,
                items: array,
            };
        }
        case constants.ACTIONS.ORDERS.SET_READY_ORDERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.ORDERS.ADD_ORDER: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case constants.ACTIONS.ORDERS.DELETE_ORDER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.order_id !== action.payload),
            }
        }
        default:
            return state;
    }
};