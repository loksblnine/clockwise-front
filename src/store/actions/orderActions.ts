import * as constants from "../../constants";

type Order = {
    order_id: number,
    master_id: number,
    customer_id: number,
    city_id: number,
    work_id: number,
    order_time: any,
    isDone: boolean
}

export const setOrders = (orders: any []) => ({
    type: constants.ACTIONS.ORDERS.SET_ORDERS,
    payload: orders
});

export const setReadyOrders = (isReady: boolean) => ({
    type: constants.ACTIONS.ORDERS.SET_READY_ORDERS,
    payload: isReady
});

export const updateOrder = (order: Order) => ({
    type: constants.ACTIONS.ORDERS.UPDATE_ORDER,
    payload: order
});

export const addOrder = (order: Order) => ({
    type: constants.ACTIONS.ORDERS.ADD_ORDER,
    payload: order
});

export const deleteOrder = (id: number) => ({
    type: constants.ACTIONS.ORDERS.DELETE_ORDER,
    payload: id
});
