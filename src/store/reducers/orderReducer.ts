import * as constants from "../../constants";

const initialState = {
    isReady: false,
    items: [],
    page: 0,
    loadNext: true,
};

export default (state: { isReady: boolean, items: any [], page: number, loadNext: boolean } = initialState, action: any) => {
    switch (action.type) {
        case constants.ACTIONS.ORDERS.SET_ORDERS: {
            const array = state.items.concat(action.payload)
            if (action.payload.length < 10) {
                console.log(action.payload.length)
                return {
                    ...state,
                    items: array,
                    isReady: true,
                    loadNext: false
                }
            }
            return {
                ...state,
                items: array,
                isReady: true,
                page: ++state.page
            };
        }
        case constants.ACTIONS.ORDERS.UPDATE_ORDER: {
            const array = state.items.filter((item: any) => item.order_id !== action.payload.order_id).concat(action.payload)
            return {
                ...state,
                items: array,
                isReady: true
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
                isReady: true
            }
        }
        case constants.ACTIONS.ORDERS.DELETE_ORDER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.order_id !== action.payload),
                isReady: true
            }
        }
        default:
            return state;
    }
};
