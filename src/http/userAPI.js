import jwt_decode from "jwt-decode";
import {instance} from "./headerPlaceholder.instance";
import * as constants from "../constants";

export const registrationMaster = async (email, password) => {
    //probably works bad
    const {data} = instance({
        method: "post",
        data: {email, password, role: "MASTER"},
        url: '/auth/register'
    })
        .then((resp) => {
            localStorage.setItem('token', resp.data.token)
        })
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
        })
        .then(() =>
            history.push(constants.PATH[1]))
}

export const checkAuth = (dispatch) => {
    if (localStorage.getItem('token').length > 0) {
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
    } else {
        console.log(1234)
        dispatch({
            type: constants.ACTIONS.USER.LOG_OUT
        })
    }
}