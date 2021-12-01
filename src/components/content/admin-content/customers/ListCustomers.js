import React, {useEffect} from "react";
import EditCustomer from "./EditCustomer";
import InputCustomer from "./InputCustomer";
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {getCustomersIntoStore} from "../../getData";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {useStore} from "react-redux";
import * as constants from "../../../../constants";

const ListCustomers = () => {
    const store = useStore()
    const {customers} = store.getState()
    const deleteCustomer = async (id) => {
        try {
            instance({
                method: "DELETE",
                url: `/customers/${id}`
            })
                .then(() =>
                    store.dispatch({
                        type: constants.ACTIONS.CUSTOMERS.DELETE_CUSTOMER,
                        payload: id
                    })
                )
                .then(() => toast("Покупатель удален"))
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    useEffect(async () => {
        if (!customers.items.length) {
            await getCustomersIntoStore(store, customers.page)
        }
    }, [customers])

    const handleNextCustomers = () => {
        getCustomersIntoStore(store, customers.page)
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Список покупателей</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">e-mail</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>
                <tbody>
                {customers.isReady ?
                    customers.items?.map(customer => (
                        <tr key={customer.customer_id}>
                            <th scope="row"> {customer.customer_id}</th>
                            <td>{customer.customer_name}</td>
                            <td>{customer.customer_email}</td>
                            <td><EditCustomer customer={customer}/></td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteCustomer(customer.customer_id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))
                    : <Spinner animation="grow"/>
                }
                </tbody>
            </table>
            {
                customers.loadNext === true &&
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={() => handleNextCustomers()}> Еще покупатели...
                    </button>
                </div>

            }
            <InputCustomer/>
        </div>
    )
}
export default ListCustomers