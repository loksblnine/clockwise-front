import {SERVER_URL} from "../../constants";
import {toast} from "react-toastify";

export const getCities = (setCities) => {
    fetch(SERVER_URL + `/cities`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setCities(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export const getCustomers = (setCustomers) => {
    fetch(SERVER_URL + `/customers`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setCustomers(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export const getMasters = (setMasters) => {
    fetch(SERVER_URL + `/masters`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setMasters(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export  const getOrders = (setOrders) => {
    fetch(SERVER_URL + `/orders`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setOrders(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}