import * as constants from "../../utils/constants";

type initialState = {
    isReady: boolean,
    items: any[],
    page: number,
    loadNext: boolean
}

const initialState: initialState = {
    isReady: false,
    items: [],
    page: 0,
    loadNext: true,
};

const blogReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.BLOG.SET_ARTICLES: {
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
        case constants.ACTIONS.BLOG.SET_READY_ARTICLES: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case constants.ACTIONS.BLOG.ADD_ARTICLE: {
            return {
                ...state,
                items: state.items.concat(action.payload),
            }
        }
        case constants.ACTIONS.BLOG.DELETE_ARTICLE: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.article_id !== action.payload),
            }
        }
        default:
            return state;
    }
};

export default blogReducer