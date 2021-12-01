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
            const array = state.items.concat(action.payload)
            if (action.payload.length < 10) {
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
        case constants.ACTIONS.CUSTOMERS.UPDATE_CUSTOMER: {
            console.log(action.payload)
            const array = state.items.filter((item: any) => item.customer_id !== action.payload.customer_id).concat(action.payload)
            return {
                ...state,
                items: array,
                isReady: true
            };
        }
        case constants.ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.CUSTOMERS.ADD_CUSTOMER: {
            console.log(action.payload)
            return {
                ...state,
                items: state.items.concat(action.payload),
                isReady: true
            }
        }
        case constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.customer_id !== action.payload),
                isReady: true
            }
        }
        default:
            return state;
    }
};
