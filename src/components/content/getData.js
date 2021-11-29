import {toast} from "react-toastify";
import {instance} from "../../http/headerPlaceholder.instance";

export const getDepsCityIdMasters = (setDeps, city_id) => {
    instance({
        method: "get",
        url: `/deps/city/${city_id}`
    })
        .then(resp => setDeps(resp.data))
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export const getDepsMasterIdCities = (setDeps, master_id) => {
    instance({
        method: "get",
        url: `/deps/master/${master_id}`
    })
        .then(resp => setDeps(resp.data))
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}
export const getCitiesIntoStore = async (DB) => {
    instance({
        method: "get",
        url: "/cities"
    })
        .then(resp => DB.setCities(resp.data))
}
export const getMastersIntoStore = async (DB) => {
    sessionStorage.setItem('pageMasterList', "0")
    instance({
        method: "get",
        url: `/masters/offset/${sessionStorage.getItem('pageMasterList')}`
    })
        .then(resp => DB?.setMasters(resp.data))
        .then(() =>
            instance({
                method: "get",
                url: `/masters/offset/1`
            })
                .then(resp => DB?.setMastersNext(resp.data))
                .then(() => sessionStorage.setItem('pageMasterList',
                    (Number(sessionStorage.getItem('pageMasterList')) + 1).toString()))
        )
}
export const getCustomersIntoStore = async (DB) => {
    sessionStorage.setItem('pageCustomerList', "0")
    instance({
        method: "get",
        url: `/customers/offset/${sessionStorage.getItem('pageCustomerList')}`
    })
        .then(resp => DB?.setCustomers(resp.data))
        .then(() =>
            instance({
                method: "get",
                url: `/customers/offset/1`
            })
                .then(resp => DB?.setCustomersNext(resp.data))
                .then(() => sessionStorage.setItem('pageCustomerList',
                    (Number(sessionStorage.getItem('pageCustomerList')) + 1).toString()))
        )
}
export const getAllDepsIntoStore = async (DB) => {
    instance({
        method: "get",
        url: "/deps"
    })
        .then(resp => DB.setDepsMasterCity(resp.data))
}
export const getOrdersIntoStore = async (DB) => {
    sessionStorage.setItem('pageOrderList', "0")
    instance({
        method: "get",
        url: `/orders/offset/${sessionStorage.getItem('pageOrderList')}`
    })
        .then(resp => DB?.setOrders(resp.data))
        .then(() =>
            instance({
                method: "get",
                url: `/orders/offset/1`
            })
                .then(resp => DB?.setOrdersNext(resp.data))
                .then(() => sessionStorage.setItem('pageOrderList',
                    (Number(sessionStorage.getItem('pageOrderList')) + 1).toString()))
        )
}

export const getFreeMastersInCity = async (setIdsUnavailableMasters, order) => {
    const body = {
        "city_id": order.city + "",
        "work_id": order.type + "",
        "order_time": order.date + "T" + order.time
    }
    instance({
        method: "post",
        data: body,
        url: "/masters/free",
    })
        .then(resp => setIdsUnavailableMasters(resp.data))
        .catch(err => {
            return err
        })
}