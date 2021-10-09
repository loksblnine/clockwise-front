import React, {Fragment, useContext, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {SERVER_URL} from "../../../../constants";
import {getCities, getCustomers, getMasters, getOrders} from "../../getData";
import {WORK_TYPES} from "../../../../constants";
import {toast} from "react-toastify";
import * as constants from "../../../../constants";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {Spinner} from "react-bootstrap";


const ListOrders = observer(() => {
    const [loading, setLoading] = useState(true)
    const {DB} = useContext(Context)
    const deleteOrder = async (id) => {
        try {
            await fetch(SERVER_URL + `/orders/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => toast(data));
            axios.get(SERVER_URL + `/orders`)
                .then(resp => DB.setOrders(resp.data))
        } catch (e) {
            toast(e.message)
        }
    }
    useEffect(() => {
        axios.get(SERVER_URL + `/orders`)
            .then(resp => DB.setOrders(resp.data))
            .finally(() => setLoading(false))
    }, [])
    if (loading) {
        return (
            <div>
                <Spinner animation={`grow`}/>
            </div>
        )
    }
    return (
        <Fragment>
            <h2 className="text-left mt-5">Список заказов</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col"># заказа</th>
                    <th scope="col"># мастера</th>
                    <th scope="col"># покупателя</th>
                    <th scope="col"># города</th>
                    <th scope="col">Тип работы</th>
                    <th scope="col">Дата заказа</th>
                    <th scope="col">Время заказа</th>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                {
                    DB.orders?.map(order => (
                        <tr key={order.order_id}>
                            <th scope="row"> {order.order_id}</th>
                            <td>{order.master_id}</td>
                            <td>{(order.customer_id)}</td>
                            <td>{(order.city_id)}</td>
                            <td>{WORK_TYPES[order.work_id].key}</td>
                            <td>{order.order_time.split('T')[0]}</td>
                            <td>{order.order_time.split('T')[1].split('.')[0]}</td>
                            <td><EditOrder order={order}/></td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteOrder(order.order_id)}
                                        disabled={order.order_time.split('T')[0] <= constants.DATE_FROM}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <InputOrder/>
        </Fragment>
    )
})
export default ListOrders