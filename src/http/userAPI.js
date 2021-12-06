import {instance} from "./headerPlaceholder.instance";
import * as constants from "../constants";
import {toast} from "react-toastify";

export const registration = async (email, password, role, dispatch) => {
    const body = {email, password, role}
    instance({
        method: "post",
        data: body,
        url: '/auth/register'
    })
        .then(({data}) => {
            dispatch({
                type: constants.ACTIONS.USER.SET_USER,
                payload: data
            })
        })
        .catch(() =>
            toast.error("Возникла ошибка при регистрации"))
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
        })
        .catch(() => {
                dispatch({
                    type: constants.ACTIONS.USER.LOG_OUT
                })
                history.push(
                    {pathname: '/'}
                )
            }
        )

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