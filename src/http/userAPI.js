import jwt_decode from "jwt-decode";
import {instance} from "./headerPlaceholder.instance";
import * as constants from "../constants";
import {toast} from "react-toastify";

export const registration = (email, password, role, dispatch, history) => {
    const body = {email, password, role}
    const {data} = instance({
        method: "post",
        data: body,
        url: '/auth/register'
    })
        .then(({data}) => {
            console.log(data)
            dispatch({
                type: constants.ACTIONS.USER.SET_USER,
                payload: data
            })
            history.push(constants.PATH[data.role])
        })
        .catch(() =>
            toast.error("Возникла ошибка при регистрации"))
    return jwt_decode(data.token)
}

export const login = (email, password, dispatch, history) => {
    instance({
        method: "post",
        data: {email, password},
        url: '/auth/login'
    })
        .then(({data}) => {
            dispatch({
                type: constants.ACTIONS.USER.SET_USER,
                payload: data
            })
            history.push(constants.PATH[data.role])
        })
        .catch(() =>
            dispatch({
                type: constants.ACTIONS.USER.LOG_OUT
            }))
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