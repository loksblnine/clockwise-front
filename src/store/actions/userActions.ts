import * as constants from "../../constants";

type User = {
    role: number,
    email: string,
    token: string
}

export const setUser = (user: User) => ({
    type: constants.ACTIONS.USER.SET_USER,
    payload: user
});

export const setReadyUser = (bool: boolean) => ({
    type: constants.ACTIONS.USER.SET_READY_USER,
    payload: bool
});

export const setJWT = (user: User) => ({
    type: constants.ACTIONS.USER.SET_JSON_WEB_TOKEN,
    payload: user
});

export const removeJWT = (user: User) => ({
    type: constants.ACTIONS.USER.REMOVE_JSON_WEB_TOKEN,
    payload: user
});
