import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
    filteredItems: [],
    page: 0,
    loadNext: true
};


const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.APPOINTMENT.SET_APPOINTMENTS: {
            if (action.payload.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    items: state.items.concat(action.payload),
                    filteredItems: state.filteredItems.concat(action.payload),
                    isReady: true,
                    loadNext: false
                }
            }
            return {
                ...state,
                items: state.items.concat(action.payload),
                filteredItems: state.filteredItems.concat(action.payload),
                isReady: true,
                loadNext: true,
                page: state.page + 1
            }
        }
        case ACTIONS.APPOINTMENT.SET_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }
        case ACTIONS.APPOINTMENT.SET_FILTERED_ARRAY: {
            if (action.payload.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    filteredItems: action.payload,
                    loadNext: false
                }
            }
            return {
                ...state,
                filteredItems: action.payload,
                page: state.page + 1,
                loadNext: true,
            }
        }
        case ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY: {
            return {
                ...state,
                filteredItems: [],
                page: 0
            };
        }

        default:
            return state;
    }
};

export default appointmentReducer;