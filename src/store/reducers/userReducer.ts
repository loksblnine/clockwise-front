import jwt_decode from "jwt-decode";
import {instance} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../utils/constants";

type User = {
    role: number,
    email: string,
}

type initialState = {
    isReady: boolean,
    user: User,
    data: any,
    photo: any
}

const initialState: initialState = {
    isReady: false,
    data: {},
    photo: [],
    user: {
        role: 0,
        email: "",
    }
};

const userReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case ACTIONS.USER.SET_USER: {
            const {token} = action.payload
            localStorage.setItem('token', token)
            let decoded = jwt_decode(token)
            return {
                ...state,
                user: decoded,
                isReady: true
            };
        }
        case ACTIONS.USER.SET_DATA: {
            return {
                ...state,
                data: action.payload
            };
        }
        case ACTIONS.USER.MASTER.ADD_CITY: {
            return {
                ...state,
                data: state.data.deps.push(action.payload.city_id)
            };
        }
        case ACTIONS.USER.MASTER.DELETE_CITY: {
            return {
                ...state,
                data: action.payload
            };
        }
        case ACTIONS.USER.ADD_PHOTO: {
            const array = state.photo.concat(action.payload)
            return {
                ...state,
                photo: array
            };
        }
        case ACTIONS.USER.REMOVE_PHOTO: {
            const array = state.photo.filter((item: string, i: number) => i !== action.payload)
            return {
                ...state,
                photo: array
            };
        }
        case ACTIONS.USER.CLEAR_PHOTOS: {
            return {
                ...state,
                photo: []
            };
        }
        case ACTIONS.USER.SET_READY_USER:
            return {
                ...state,
                isReady: action.payload
            };
        case ACTIONS.USER.SET_JSON_WEB_TOKEN: {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload,
                isReady: true
            }
        }
        case ACTIONS.USER.REMOVE_JSON_WEB_TOKEN: {
            localStorage.removeItem('token')
            return {
                ...state,
                user: {},
                isReady: true
            }
        }
        case ACTIONS.USER.LOG_OUT: {
            localStorage.removeItem('token')
            instance({
                method: "get",
                url: "/auth/google/logout"
            })
            return {
                ...state,
                user: {},
                isReady: true
            }
        }
        default:
            return state;
    }
};
export default userReducer
