import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
    nextItems: [],
    filteredItems: [],
    nextFilteredItems: [],
    page: 0,
    loadNext: true
};

const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FEEDBACK.SET_FEEDBACKS: {
            if (action.payload.length === LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    items: state.items.concat(state.nextItems),
                    filteredItems: state.filteredItems.concat(state.nextItems),
                    nextItems: action.payload,
                    isReady: true,
                    loadNext: true,
                    page: state.page + 1
                };
            }
            return {
                ...state,
                items: state.items.concat(state.nextItems, action.payload),
                filteredItems: state.filteredItems.concat(state.nextItems, action.payload),
                nextItems: [],
                isReady: true,
                loadNext: false
            };
        }
        case ACTIONS.FEEDBACK.SET_PAGE: {
            return {
                ...state,
                page: action.payload
            };
        }
        case ACTIONS.FEEDBACK.SET_FILTERED_ARRAY: {
            if (action.payload.length === LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    filteredItems: state.filteredItems.concat(state.nextFilteredItems),
                    nextFilteredItems: action.payload,
                    isReady: true,
                    loadNext: true,
                    page: state.page + 1
                };
            }
            return {
                ...state,
                filteredItems: state.filteredItems.concat(state.nextFilteredItems, action.payload),
                nextFilteredItems: [],
                isReady: true,
                loadNext: false
            };
        }
        case ACTIONS.FEEDBACK.CLEAR_ARRAY: {
            return {
                ...state,
                isReady: false,
                items: [],
                nextItems: [],
                filteredItems: [],
                nextFilteredItems: [],
                page: 0,
                loadNext: true
            };
        }
        case ACTIONS.FEEDBACK.SET_OLD_ITEMS: {
            return {
                ...state,
                isReady: true,
                filteredItems: state.items,
                page: Math.ceil(state.items.length / LIMIT_ITEM_PER_PAGE) + 1,
                loadNext: state.items.length % LIMIT_ITEM_PER_PAGE === 0
            };
        }
        case ACTIONS.FEEDBACK.SET_READY_FEEDBACKS: {
            return {
                ...state,
                isReady: action.payload
            };
        }

        default:
            return state;
    }
};

export default feedbackReducer;