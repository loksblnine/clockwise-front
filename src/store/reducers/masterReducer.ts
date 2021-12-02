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
        case constants.ACTIONS.MASTERS.SET_MASTERS: {
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
        case constants.ACTIONS.MASTERS.UPDATE_MASTER: {
            const array = state.items.filter((item: any) => item.order_id !== action.payload.order_id).concat(action.payload)
            return {
                ...state,
                items: array,
            };
        }
        case constants.ACTIONS.MASTERS.SET_READY_MASTERS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.MASTERS.ADD_MASTER: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case constants.ACTIONS.MASTERS.DELETE_MASTER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.order_id !== action.payload),
            }
        }
        // case constants.ACTIONS.MASTERS.DELETE_CITY_AT_MASTER: {
        //     return {
        //         ...state,
        //         items: state.items.map((master: any) => {
        //             if (master.master_id === action.payload.master_id) {
        //                 master.deps.filter((d: number) => d === action.payload.city_id)
        //             }
        //         })
        //     }
        // }
        default:
            return state;
    }
};
