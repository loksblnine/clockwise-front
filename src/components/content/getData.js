import {toast} from "react-toastify";
import {instance} from "../../http/headerPlaceholder.instance";
import * as constants from "../../constants";
import {setCities} from "../../store/actions/cityActions";
import {setMasters} from "../../store/actions/masterActions";
import {setCustomers} from "../../store/actions/customerActions";

export const getCitiesIntoStore = async (dispatch) => {
    const {data} = await instance({
        method: "get",
        url: "/cities"
    })
    console.log(data)
    // .then(({data}) => {
    //     console.log(data)
    //     dispatch(setCities(data))
    // })
}
export const getMastersIntoStore = async (dispatch, page) => {
    instance({
        method: "get",
        url: `/masters/offset/${page}`
    })
        .then(({data}) => dispatch(setMasters(data)))
}
export const getCustomersIntoStore = async (dispatch, page) => {
    instance({
        method: "get",
        url: `/customers/offset/${page}`
    })
        .then(({data}) => dispatch(setCustomers(data)))
}
export const getOrdersIntoStore = async (dispatch, page, role = 1, id) => {
    switch (role) {
        case 1: {
            instance({
                method: "get",
                url: `/orders/offset/${page}`
            })
                .then(({data}) => dispatch({
                    type: constants.ACTIONS.ORDERS.SET_ORDERS,
                    payload: data
                }))
            break;
        }
        case 2: {
            instance({
                method: "get",
                url: `/orders/master/${id}/offset/${page}`
            })
                .then(({data}) => dispatch({
                    type: constants.ACTIONS.ORDERS.SET_ORDERS,
                    payload: data
                }))
            break;
        }
        case 3: {
            instance({
                method: "get",
                url: `/orders/customer/${id}/offset/${page}`
            })
                .then(({data}) => dispatch({
                    type: constants.ACTIONS.ORDERS.SET_ORDERS,
                    payload: data
                }))
            break;
        }
        default: {
            break;
        }
    }
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
