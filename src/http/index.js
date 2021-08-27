import axios from 'axios'
import {SERVER_URL} from "../constants";


export const $authHost = axios.create({
    baseURL: SERVER_URL
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)