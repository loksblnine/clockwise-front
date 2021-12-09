import * as constants from "../../constants";
import jwt_decode from "jwt-decode";

type User = {
    role: number,
    email: string,
}

type initialState = {
    isReady: boolean,
    user: User,
    data: any
}

const initialState: initialState = {
    isReady: false,
    data: {},
    user: {
        role: 0,
        email: "",
    }
};

const userReducer = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.USER.SET_USER: {
            const {token} = action.payload
            localStorage.setItem('token', token)
            let decoded = jwt_decode(token)
            return {
                ...state,
                user: decoded,
                isReady: true
            };
        }
        case constants.ACTIONS.USER.SET_DATA: {
            return {
                ...state,
                data: action.payload
            };
        }
        case constants.ACTIONS.USER.MASTER.ADD_CITY: {
            return {
                ...state,
                data: state.data.deps.push(action.payload.city_id)
            };
        }
        case constants.ACTIONS.USER.MASTER.DELETE_CITY: {
            return {
                ...state,
                data: action.payload
            };
        }
        case constants.ACTIONS.USER.SET_READY_USER:
            return {
                ...state,
                isReady: action.payload
            };
        case constants.ACTIONS.USER.SET_JSON_WEB_TOKEN: {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload,
                isReady: true
            }
        }
        case constants.ACTIONS.USER.REMOVE_JSON_WEB_TOKEN: {
            localStorage.removeItem('token')
            return {
                ...state,
                user: {},
                isReady: true
            }
        }
        case constants.ACTIONS.USER.LOG_OUT: {
            localStorage.removeItem('token')
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