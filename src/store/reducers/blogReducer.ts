import * as constants from "../../utils/constants";

type initialState = {
    isReady: boolean,
    items: any[],
    page: number,
    loadNext: boolean,
    photo: string
}

const initialState: initialState = {
    isReady: false,
    items: [],
    page: 0,
    loadNext: false,
    photo: ""
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
        case constants.ACTIONS.BLOG.UPDATE_ARTICLE: {
            const array = state.items.map((item: any) => {
                if (item.article_id === action.payload.article_id)
                    return action.payload
                else return item
            })
            return {
                ...state,
                items: array,
                isReady: true
            };
        }
        case constants.ACTIONS.BLOG.DELETE_ARTICLE: {
            return {
                ...state,
                items: state.items.filter((item: any) => item.article_id !== action.payload),
            }
        }
        case constants.ACTIONS.BLOG.SET_ARTICLE_PHOTO: {
            return {
                ...state,
                photo: action.payload,
            }
        }
        case constants.ACTIONS.BLOG.REMOVE_ARTICLE_PHOTO: {
            return {
                ...state,
                photo: ""
            }
        }
        default:
            return state;
    }
};

export default blogReducer
