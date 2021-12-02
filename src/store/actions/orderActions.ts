import * as constants from "../../constants";

export const setOrders = (cities: any []) => ({
    type: constants.ACTIONS.ORDERS.SET_ORDERS,
    payload: cities
});

export const setReadyOrders = (bool: boolean) => ({
    type: constants.ACTIONS.ORDERS.SET_READY_ORDERS,
    payload: bool
});

export const updateOrder = (city: object) => ({
    type: constants.ACTIONS.ORDERS.UPDATE_ORDER,
    payload: city
});

export const addOrder = (city: object) => ({
    type: constants.ACTIONS.ORDERS.ADD_ORDER,
    payload: city
});

export const deleteOrder = (id: number) => ({
    type: constants.ACTIONS.ORDERS.DELETE_ORDER,
    payload: id
});
