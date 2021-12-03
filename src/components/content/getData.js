import {toast} from "react-toastify";
import {instance} from "../../http/headerPlaceholder.instance";
import * as constants from "../../constants";

export const getCitiesIntoStore = async (dispatch) => {
    instance({
        method: "get",
        url: "/cities"
    })
        .then(({data}) => {
            dispatch({
                type: constants.ACTIONS.CITIES.SET_CITIES,
                payload: data
            })
        })
}
export const getMastersIntoStore = async (dispatch, page) => {
    instance({
        method: "get",
        url: `/masters/offset/${page}`
    })
        .then(({data}) => dispatch({
            type: constants.ACTIONS.MASTERS.SET_MASTERS,
            payload: data
        }))
}
export const getCustomersIntoStore = async (dispatch, page) => {
    instance({
        method: "get",
        url: `/customers/offset/${page}`
    })
        .then(({data}) => dispatch({
            type: constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS,
            payload: data
        }))
}
export const getOrdersIntoStore = async (dispatch, page) => {
    instance({
        method: "get",
        url: `/orders/offset/${page}`
    })
        .then(({data}) => dispatch({
            type: constants.ACTIONS.ORDERS.SET_ORDERS,
            payload: data
        }))
}
export const getFreeMasters = async (orderBody, setMasters) => {
    instance({
        method: "post",
        data: orderBody,
        url: `/masters/free`,
    })
        .then(({data}) => setMasters(data))
        .catch(() => toast.error("Возникли трудности"))
}
