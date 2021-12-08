import {instance} from "./headerPlaceholder.instance";
import * as constants from "../constants";

export const registration = async (email, password, role) => {
    const body = {email, password, role}
    const {data} = await instance({
        method: "post",
        data: body,
        url: '/auth/register'
    })
    return data
}

export const login = async (email, password) => {
    const {data} = await instance({
        method: "post",
        data: {email, password},
        url: '/auth/login'
    })
    return data
}

export const checkAuth = (dispatch) => {
    instance({
        method: "get",
        url: `/auth/login`
    })
        .then(({data}) => {
            dispatch({
                type: constants.ACTIONS.USER.SET_USER,
                payload: data
            })
        })
        .catch(() => {
            dispatch({
                type: constants.ACTIONS.USER.LOG_OUT
            })
        })

}