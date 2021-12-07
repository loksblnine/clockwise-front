import * as constants from "../../constants";

type Customer = {
    customer_id: number,
    customer_name: string,
    customer_email: string,
    isApproved: boolean
}

export const setCustomers = (customers: any []) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS,
    payload: customers
});

export const setReadyCustomers = (isReady: boolean) => ({
    type: constants.ACTIONS.CUSTOMERS.SET_READY_CUSTOMERS,
    payload: isReady
});

export const updateCustomer = (customer: Customer) => ({
    type: constants.ACTIONS.CUSTOMERS.UPDATE_CUSTOMER,
    payload: customer
});

export const addCustomer = (customer: Customer) => ({
    type: constants.ACTIONS.CUSTOMERS.ADD_CUSTOMER,
    payload: customer
});

export const deleteCustomer = (id: number) => ({
    type: constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER,
    payload: id
});
