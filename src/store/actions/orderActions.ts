import {instance} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../utils/constants";

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
            type: ACTIONS.ORDERS.SET_ORDERS,
            payload: {data}
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
            type: ACTIONS.ORDERS.SET_ORDERS,
            payload: {data}
        });
    }
}
export const sortOrders = (param: string[]) => {
    return (dispatch: any) => {
        dispatch({
            type: ACTIONS.ORDERS.SORT,
            payload: param
        })
    }
}
export const setOrdersCustomer = (page: number, id: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/orders/customer/${id}/offset/${page}`
        })
        dispatch({
            type: ACTIONS.ORDERS.SET_ORDERS,
            payload: {page, data}
        });
    }
}

export const setReadyOrders = (isReady: boolean) => ({
    type: ACTIONS.ORDERS.SET_READY_ORDERS,
    payload: isReady
});

export const updateOrder = (order: Order, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "put",
            data: order,
            url: `/orders/${id}`
        })
        dispatch({
            type: ACTIONS.ORDERS.UPDATE_ORDER,
            payload: data
        });
    }
}

export const addOrder = (order: Order) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: order,
            url: "/orders"
        })
        dispatch({
            type: ACTIONS.ORDERS.ADD_ORDER,
            payload: data
        });
    }
}

export const deleteOrder = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            url: `/orders/${id}`
        })
        dispatch({
            type: ACTIONS.ORDERS.DELETE_ORDER,
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
            type: ACTIONS.USER.CUSTOMER.SET_MARK,
            payload: {mark, id}
        });
    }
}
