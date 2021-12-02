import * as constants from "../../constants";

type User = {
    role: number,
    email: string,
    token: string
}

type initialState = {
    isReady: boolean,
    user: User
}

const initialState: initialState = {
    isReady: false,
    user: {
        role: 0,
        email: "",
        token: ""
    }
};

export default (state: initialState = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case constants.ACTIONS.USER.SET_USER: {
            return {
                ...state,
                user: action.payload,
                isReady: true
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
        default:
            return state;
    }
};
