import React, {useContext, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {WORK_TYPES} from "../../../../constants";
import {toast} from "react-toastify";
import * as constants from "../../../../constants";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {getOrdersIntoStore} from "../../getData";
import {instance} from "../../../../http/headerPlaceholder.instance";

const ListOrders = observer(() => {
    const [loading, setLoading] = useState(true)
    const {DB} = useContext(Context)
    const deleteOrder = async (id) => {
        try {
            instance({
                method: "DELETE",
                url: `/orders/${id}`
            })
                .then(resp => toast(resp.data))
                .then(() =>
                    getOrdersIntoStore(DB)
                )
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    const handleNextOrders = () => {
        DB?.setOrders(DB.orders.concat(DB.ordersNext))
        sessionStorage.setItem('pageOrderList', (Number(sessionStorage.getItem('pageOrderList')) + 1).toString())
        instance({
            method: "get",
            url: `/orders/offset/${sessionStorage.getItem('pageOrderList')}`
        })
            .then(resp => DB.setOrdersNext(resp.data))
    }
    useEffect(async () => {
        getOrdersIntoStore(DB)
            .finally(() => setLoading(false))
    }, [DB])
    if (loading) {
        return (
            <div>
                <Spinner animation="grow"/>
            </div>
        )
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Список заказов</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col"># заказа</th>
                    <th scope="col">Мастер</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Город</th>
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
                            <td>{order.master.master_name}</td>
                            <td>{order.customer.customer_name}</td>
                            <td>{order.city.city_name}</td>
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
                        <button className="btn btn-primary" onClick={() => handleNextOrders()}> Еще заказы...</button>
                    </div>
                    : null
            }
            <InputOrder/>
        </div>
    )
})
export default ListOrders