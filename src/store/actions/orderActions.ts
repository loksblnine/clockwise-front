import * as constants from "../../utils/constants";
import {instance} from "../../http/headerPlaceholder.instance";

type Order = {
    order_id: number,
    master_id: number,
    customer_id: number,
    city_id: number,
    work_id: number,
    order_time: any,
    isDone: boolean
}

export const setOrdersAdmin = (page: number, queryParams: string) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/orders/offset/${page}?${queryParams}`
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.SET_ORDERS,
            payload: data
        });
    }
}
export const setOrdersMaster = (page: number, id: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/orders/master/${id}/offset/${page}`
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.SET_ORDERS,
            payload: data
        });
    }
}
export const setOrdersCustomer = (page: number, id: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/orders/customer/${id}/offset/${page}`
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.SET_ORDERS,
            payload: data
        });
    }
}

export const setReadyOrders = (isReady: boolean) => ({
    type: constants.ACTIONS.ORDERS.SET_READY_ORDERS,
    payload: isReady
});

export const updateOrder = (order: Order, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "PUT",
            data: order,
            url: `/orders/${id}`
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.UPDATE_ORDER,
            payload: data
        });
    }
}

export const addOrder = (order: Order) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "POST",
            data: order,
            url: "/orders"
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.ADD_ORDER,
            payload: data
        });
    }
}

export const deleteOrder = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "DELETE",
            url: `/orders/${id}`
        })
        dispatch({
            type: constants.ACTIONS.ORDERS.DELETE_ORDER,
            payload: id
        });
    }
}

export const setMarkOrder = (id: number, mark: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "put",
            data: {mark},
            url: `/auth/set-mark/${id}`
        })
        dispatch({
            type: constants.ACTIONS.USER.CUSTOMER.SET_MARK,
            payload: {mark, id}
        });
    }
}
