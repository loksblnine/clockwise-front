import React, {Fragment, useEffect, useState} from "react";
import EditCustomer from "./EditCustomer";
import InputCustomer from "./InputCustomer";
import {SERVER_URL} from "../../../../constants";
import {getCustomers} from "../../getData";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true)
    const deleteCustomer = async (id) => {
        try {
            await fetch(SERVER_URL + `/customers/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => toast(data));
            await getCustomers(setCustomers)
        } catch (e) {
            toast.info("🦄 Ахахха сервер упал")
        }
    }

    useEffect(() => {
        getCustomers(setCustomers)
        setLoading(false)
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <Fragment>
            {" "}
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
                {customers.map(customer => (
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
                ))}

                </tbody>
            </table>
            <InputCustomer/>
        </Fragment>
    )
}
export default ListCustomers