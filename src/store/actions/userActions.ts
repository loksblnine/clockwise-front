import * as constants from "../../constants";
import {login} from "../../http/userAPI";
import {instance} from "../../http/headerPlaceholder.instance";

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
export const setUserData = (type: string, email: string) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "get",
            url: `/${type}/email/${email}`
        })
        dispatch({
            type: constants.ACTIONS.USER.SET_DATA,
            payload: data
        })
    }
}
export const setMasterNewCity = (body: any) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: body,
            url: `/deps`
        })
        dispatch({
            type: constants.ACTIONS.USER.MASTER.ADD_CITY,
            payload: data
        })
    }
}
export const deleteMasterCity = (body: any) => {
    return async (dispatch: any) => {
        await instance({
            method: "DELETE",
            data: body,
            url: `/deps`
        })
        dispatch({
            type: constants.ACTIONS.USER.MASTER.DELETE_CITY,
            payload: body
        });
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
