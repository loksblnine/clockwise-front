import * as constants from "../../constants";

export const setCustomers = (customers: any []) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS,
    payload: customers
});

export const setReadyCustomers = (bool: boolean) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS,
    payload: bool
});

export const updateCustomer = (customer: object) => ({
    type: constants.ACTIONS.CUSTOMERS.UPDATE_CUSTOMER,
    payload: customer
});

export const addCustomer = (customer: object) => ({
    type: constants.ACTIONS.CUSTOMERS.ADD_CUSTOMER,
    payload: customer
});

export const deleteCustomer = (id: number) => ({
    type: constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER,
    payload: id
});
