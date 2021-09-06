import jwt_decode from "jwt-decode";
import * as constants from "../constants";

export const registration = async (email, password) => {
    const {data} = await fetch(constants.SERVER_URL + `/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password, role: "ADMIN"})
    })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const resp = await fetch(constants.SERVER_URL + `/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
        .then(response => response.json())
        .then(data => console.log(data.token))
    localStorage.setItem('token', resp.token)
    console.log(jwt_decode(resp.token))
    return true
}


export const check = async () => {
    const {data} = await fetch(constants.SERVER_URL + `/login`, {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`}
    })
        .then(response => response.json())
        .then(data => localStorage.setItem('token', data.token))
    return jwt_decode(data.token)
}