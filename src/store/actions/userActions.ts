import * as constants from "../../constants";
import {login} from "../../http/userAPI";

type User = {
    role: number,
    email: string,
    token: string,
    data: any
}

export const setUser = (email: string, password: string) => {
    return async (dispatch: any) => {
        login(email, password).then(({token}) =>
            dispatch({
                type: constants.ACTIONS.USER.SET_USER,
                payload: {token}
            })
        )
    }
}

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
