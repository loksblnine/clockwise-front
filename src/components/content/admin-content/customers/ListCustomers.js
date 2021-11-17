import React, {Fragment, useEffect, useContext, useState} from "react";
import EditCustomer from "./EditCustomer";
import InputCustomer from "./InputCustomer";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getCustomersIntoStore} from "../../getData";

const ListCustomers = observer(() => {
    const {DB} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const deleteCustomer = async (id) => {
        try {
            await fetch(SERVER_URL + `/customers/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => response.json())
                .then(data => toast(data));
            await getCustomersIntoStore(DB)
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }

    useEffect(() => {
        getCustomersIntoStore(DB)
            .finally(() => setLoading(false))
    }, [DB])

    if (loading) {
        return (
            <div>
                <Spinner animation={`grow`}/>
            </div>
        )
    }

    return (
        <Fragment>
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
                {DB.customers.map(customer => (
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
})
export default ListCustomers