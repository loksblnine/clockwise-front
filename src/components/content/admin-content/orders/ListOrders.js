import React, {Fragment, useContext, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {WORK_TYPES} from "../../../../constants";
import {toast} from "react-toastify";
import * as constants from "../../../../constants";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {getCitiesIntoStore, getCustomersIntoStore, getMastersIntoStore, getOrdersIntoStore} from "../../getData";
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
        if (DB.cities.length <= 0)
            await getCitiesIntoStore(DB)
        if (DB.customers.length <= 0)
            await getCustomersIntoStore(DB)
        if (DB.masters.length <= 0)
            await getMastersIntoStore(DB)
        getOrdersIntoStore(DB)
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
                            <td>{DB.masters?.find(m => m.master_id === order.master_id)?.master_name.length ? DB.masters.find(m => m.master_id === order.master_id)?.master_name : order.master_id}</td>
                            <td>{DB.customers?.find(c => c.customer_id === order.customer_id)?.customer_name.length ? DB.customers.find(c => c.customer_id === order.customer_id)?.customer_name : order.customer_id}</td>
                            <td>{DB.cities?.find(c => c.city_id === order.city_id)?.city_name.length ? DB.cities.find(c => c.city_id === order.city_id)?.city_name : order.city_id}</td>
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
        </Fragment>
    )
})
export default ListOrders