import React, {useEffect} from "react";
import EditCustomer from "./EditCustomer";
import InputCustomer from "./InputCustomer";
import {getCustomersIntoStore} from "../../getData";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {deleteCustomer} from "../../workWithData";

const ListCustomers = () => {
    const customers = useSelector((state) => state.customers.items)
    const {isReady, loadNext, page} = useSelector((state) => state.customers)
    const dispatch = useDispatch()

    useEffect(() => {
        if (customers.length <= 0) {
            getCustomersIntoStore(dispatch, page)
        }
    }, [dispatch, customers.length, page])
    const handleNextCustomers = (e) => {
        e.target.disabled = true
        getCustomersIntoStore(dispatch, page)
            .then(() =>
                e.target.disabled = false)
    }
    if (!isReady) {
        return <Spinner animation="grow"/>
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
                {customers?.map(customer => (
                    <tr key={customer.customer_id}>
                        <th scope="row"> {customer.customer_id}</th>
                        <td>{customer.customer_name}</td>
                        <td>{customer.customer_email}</td>
                        <td><EditCustomer customer={customer}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => deleteCustomer(customer.customer_id, dispatch)}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {
                loadNext &&
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={(e) => handleNextCustomers(e)}> Еще покупатели...
                    </button>
                </div>
            }
            <InputCustomer/>
        </div>
    )
}
export default ListCustomers