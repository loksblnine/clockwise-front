import * as constants from "../../constants";

export const setCustomers: object = (cities: any []) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS,
    payload: cities
});

export const setReadyCustomers: object = (bool: boolean) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS,
    payload: bool
});

export const updateCustomer: object = (city: object) => ({
    type: constants.ACTIONS.CUSTOMERS.UPDATE_CUSTOMER,
    payload: city
});

export const addCustomer: object = (city: object) => ({
    type: constants.ACTIONS.CUSTOMERS.ADD_CUSTOMER,
    payload: city
});

export const deleteCustomer: object = (id: number) => ({
    type: constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER,
    payload: id
});
