import * as constants from "../../utils/constants";

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

const masterReducer = (state = initialState, action: { type: string; payload: any; }) => {
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
            //todo rewrite
            const array = state.items.filter((item: any) => item.master_id !== action.payload.master_id).concat(action.payload)
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
        case constants.ACTIONS.USER.ADMIN.APPROVE_MASTER: {
            const array = state.items.map((item: any) => {
                if (item.master_id === action.payload.id) {
                    item.isApproved = action.payload.active
                }
                return item
            })
            return {
                ...state,
                items: array,
            };
        }
        case constants.ACTIONS.MASTERS.DELETE_MASTER: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.master_id !== action.payload),
            }
        }
        case constants.ACTIONS.MASTERS.DELETE_CITY_AT_MASTER: {
            state.items.find(item => item.master_id === action.payload.master_id).deps.splice(state.items.find(item => item.master_id === action.payload.master_id).deps.indexOf(action.payload.city_id), 1)
            return {
                ...state,
                items: state.items
            }
        }
        case constants.ACTIONS.MASTERS.ADD_CITY_AT_MASTER: {
            state.items.find(item => item.master_id === action.payload.master_id).deps.push(action.payload.city_id)
            return {
                ...state,
                items: state.items
            }
        }
        default:
            return state;
    }
}

export default masterReducer
