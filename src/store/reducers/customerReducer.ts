import {ACTIONS} from "../../utils/constants";

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

const customerReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case ACTIONS.CUSTOMERS.SET_CUSTOMERS: {
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
        case ACTIONS.CUSTOMERS.UPDATE_CUSTOMER: {
            const array = state.items.filter((item: any) => item.customer_id !== action.payload.customer_id).concat(action.payload)
            return {
                ...state,
                items: array,
            };
        }
        case ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case ACTIONS.CUSTOMERS.ADD_CUSTOMER: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case ACTIONS.CUSTOMERS.DELETE_CUSTOMER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.customer_id !== action.payload),
            }
        }
        default:
            return state;
    }
};

export default customerReducer
