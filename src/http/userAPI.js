import jwt_decode from "jwt-decode";
import {instance} from "./headerPlaceholder.instance";

export const registrationMaster = async (email, password) => {
    //probably works bad
    const {data} = instance({
        method: "post",
        data: {email, password, role: "MASTER"},
        url: '/register'
    })
        .then((resp) => {
            localStorage.setItem('token', resp.data.token)
        })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    return instance({
        method: "post",
        data: {email, password},
        url: '/login'
    })
        .then((resp) => {
            localStorage.setItem('token', resp.data.token)
        })
}

export const checkAuth = async () => {
    if (!!localStorage.getItem('token'))
        return instance({
            method: "get",
            url: `/login`
        })
}