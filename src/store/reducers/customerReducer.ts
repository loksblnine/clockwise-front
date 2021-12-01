import * as constants from "../../constants";

const initialState = {
    isReady: false,
    items: [],
    page: 0,
    loadNext: true,
};

export default (state: { isReady: boolean, items: any [], page: number, loadNext: boolean } = initialState, action: any) => {
    switch (action.type) {
        case constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS: {
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
                page: ++state.page
            };
        }
        case constants.ACTIONS.CUSTOMERS.UPDATE_CUSTOMER: {
            const array = state.items.filter((item: any) => item.customer_id !== action.payload.customer_id).concat(action.payload)
            return {
                ...state,
                items: array,
            };
        }
        case constants.ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.CUSTOMERS.ADD_CUSTOMER: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.customer_id !== action.payload),
            }
        }
        default:
            return state;
    }
};
