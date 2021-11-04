import React, {Fragment, useContext, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {SERVER_URL} from "../../../../constants";
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
    const handleNextOrders = () => {
        DB.setOrders(DB.orders.concat(DB.ordersNext))
        sessionStorage.setItem('pageOrderList', Number(sessionStorage.getItem('pageOrderList'))+1)
        axios.get(SERVER_URL + `/orders/offset/` + sessionStorage.getItem('pageOrderList'))
            .then(resp => DB.setOrdersNext(resp.data))
    }
    useEffect(() => {
        if (DB.cities.length <= 0)
            axios.get(SERVER_URL + `/cities`)
                .then(resp => DB.setCities(resp.data))
        if (DB.customers.length <= 0)
            axios.get(SERVER_URL + `/customers`)
                .then(resp => DB.setCustomers(resp.data))
        if (DB.masters.length <= 0)
            axios.get(SERVER_URL + `/masters`)
                .then(resp => DB.setMasters(resp.data))
        sessionStorage.setItem('pageOrderList', 0)
        axios.get(SERVER_URL + `/orders/offset/` + sessionStorage.getItem('pageOrderList'))
            .then(resp => DB.setOrders(resp.data))
            .then(
                axios.get(SERVER_URL + `/orders/offset/1`)
                    .then(resp => DB.setOrdersNext(resp.data))
                    .then(() => sessionStorage.setItem('pageOrderList', Number(sessionStorage.getItem('pageOrderList'))+1))
            )
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
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                    DB.orders?.map(order => (
                        <tr key={order.order_id}>
                            <th scope="row"> {order.order_id}</th>
                            <td>{DB.masters.find(m => m.master_id === order.master_id)?.master_name.length ? DB.masters.find(m => m.master_id === order.master_id)?.master_name : order.master_id}</td>
                            <td>{DB.customers.find(c => c.customer_id === order.customer_id)?.customer_name.length ? DB.customers.find(c => c.customer_id === order.customer_id)?.customer_name : order.customer_id}</td>
                            <td>{DB.cities.find(c => c.city_id === order.city_id)?.city_name.length ? DB.cities.find(c => c.city_id === order.city_id)?.city_name : order.city_id}</td>
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
            {
                DB.ordersNext.length >= 1 ?
                    <div className="col text-center">
                        <button className="btn btn-primary" onClick={() => handleNextOrders()} > Еще заказы...</button>
                    </div>
                    : null
            }
            <InputOrder/>
        </Fragment>
    )
})
export default ListOrders