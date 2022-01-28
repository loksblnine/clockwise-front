import {ACTIONS} from "../../utils/constants";

type initialState = {
    isReady: boolean,
    items: any[],
    calendar: any[],
    isCalendarReady: boolean,
    page: number,
    loadNext: boolean
}

const initialState: initialState = {
    isReady: false,
    isCalendarReady: false,
    items: [],
    calendar: [],
    page: 0,
    loadNext: false,
};
const orderReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case ACTIONS.ORDERS.SET_ORDERS: {
            if (state.items.length > 0 && action.payload.page === 0) {
                return {
                    ...state,
                    items: action.payload.data,
                    isReady: true,
                    loadNext: true,
                    page: 1
                };
            }
            if (action.payload.data.length < 10) {
                return {
                    ...state,
                    items: state.items.concat(action.payload.data),
                    isReady: true,
                    loadNext: false
                }
            }
            return {
                ...state,
                items: state.items.concat(action.payload.data),
                isReady: true,
                loadNext: true,
                page: state.page + 1
            };
        }
        case ACTIONS.ORDERS.SET_CALENDAR: {
            return {
                ...state,
                calendar: action.payload,
                isCalendarReady: true,
            };
        }
        case ACTIONS.ORDERS.SET_CALENDAR_READY: {
            return {
                ...state,
                calendar: [],
                isCalendarReady: false,
            };
        }
        case ACTIONS.ORDERS.UPDATE_ORDER: {
            const array = state.items.filter((item: any) => item.order_id !== action.payload.order_id).concat(action.payload)
            return {
                ...state,
                items: array,
            };
        }
        case ACTIONS.MASTERS.APPROVE_ORDER: {
            const array = state.items.map((item: any) => {
                if (item.order_id === action.payload) {
                    item.isDone = true
                }
                return item
            })
            const calendar = state.calendar.map((item: any) => {
                if (item.order_id === action.payload) {
                    item.isDone = true
                }
                return item
            })
            return {
                ...state,
                items: array,
                calendar
            };
        }
        case ACTIONS.ORDERS.SET_PAGE: {
            return {
                ...state,
                isReady: false,
                items: [],
                page: action.payload
            }
        }
        case ACTIONS.ORDERS.SET_READY_ORDERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case ACTIONS.USER.CUSTOMER.SET_MARK: {
            const array = state.items.map(order => {
                if (order.order_id === action.payload.id) {
                    order.mark = action.payload.mark
                }
                return order
            })
            return {
                ...state,
                items: array,
            };
        }
        case ACTIONS.ORDERS.ADD_ORDER: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case ACTIONS.ORDERS.SORT: {
            return {
                ...state,
                items: state.items.sort((i1: any, i2: any) => {
                    if (i1[`${action.payload[0]}`] < i2[`${action.payload[0]}`]) {
                        return (-1 * (action.payload[1] === "ASC" ? 1 : -1))
                    }
                    if (i1[`${action.payload[0]}`] > i2[`${action.payload[0]}`]) {
                        return (1 * (action.payload[1] === "ASC" ? 1 : -1))
                    }
                    return 0
                }),
            }
        }
        case ACTIONS.ORDERS.DELETE_ORDER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.order_id !== action.payload),
            }
        }
        default:
            return state;
    }
};
export default orderReducer
