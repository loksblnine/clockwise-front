import {SERVER_URL} from "../../constants";
import {toast} from "react-toastify";
import axios from "axios";

axios.interceptors.request.use(
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

export const getDepsCityIdMasters = (setDeps, city_id) => {
    fetch(SERVER_URL + `/deps/city/` + city_id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setDeps(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export const getDepsMasterIdCities = (setDeps, master_id) => {
    fetch(SERVER_URL + `/deps/master/` + master_id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setDeps(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}
export const getCitiesIntoStore = async (DB) => {
    axios.get(SERVER_URL + `/cities`)
        .then(resp => DB.setCities(resp.data))
}
export const getMastersIntoStore = async (DB) => {
    axios.get(SERVER_URL + `/masters`)
        .then(resp => DB.setMasters(resp.data))
}
export const getCustomersIntoStore = async (DB) => {
    axios.get(SERVER_URL + `/customers`)
        .then(resp => DB.setCustomers(resp.data))
}
export const getAllDepsIntoStore = async (DB) => {
    axios.get(SERVER_URL + `/deps`)
        .then(resp => DB.setDepsMasterCity(resp.data))
}
export const getOrdersIntoStore = async (DB) => {
    sessionStorage.setItem('pageOrderList', "0")
    axios.get(SERVER_URL + `/orders/offset/` + sessionStorage.getItem('pageOrderList'))
        .then(resp => DB.setOrders(resp.data))
        .then(()=>
            axios.get(SERVER_URL + "/orders/offset/1")
                .then(resp => DB.setOrdersNext(resp.data))
                .then(() => sessionStorage.setItem('pageOrderList',
                    (Number(sessionStorage.getItem('pageOrderList')) + 1).toString()))
        )
}