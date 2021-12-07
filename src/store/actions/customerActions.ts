import * as constants from "../../constants";
import {instance} from "../../http/headerPlaceholder.instance";

type Customer = {
    customer_id: number,
    customer_name: string,
    customer_email: string,
    isApproved: boolean
}

export const setCustomers = (page: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/customers/offset/${page}`
        })
        dispatch({
            type: constants.ACTIONS.CUSTOMERS.SET_CUSTOMERS,
            payload: data
        });
    }
}

export const setReadyCustomers = () => (isReady: boolean) => ({
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
