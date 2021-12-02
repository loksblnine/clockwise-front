import React, {useEffect} from "react";
import EditOrder from "./EditOrder";
import InputOrder from "./InputOrder";
import {toast} from "react-toastify";
import * as constants from "../../../../constants";
import {getOrdersIntoStore} from "../../getData";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {useStore} from "react-redux";

const ListOrders = () => {
    const store = useStore()
    const {orders} = store.getState()
    const deleteOrder = async (id) => {
        try {
            instance({
                method: "DELETE",
                url: `/orders/${id}`
            })
                .then(() =>
                    store.dispatch({
                        type: constants.ACTIONS.ORDERS.DELETE_ORDER,
                        payload: id
                    })
                )
                .then(() => toast("Заказ удален"))
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    useEffect(async () => {
        if (!orders.items.length) {
            await getOrdersIntoStore(store, orders.page)
        }
    }, [orders])
    const handleNextOrders = () => {
        getOrdersIntoStore(store, orders.page)
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
                    <th scope="col">&nbsp;</th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {orders.items?.map(order => (
                    <tr key={order.order_id}>
                        <th scope="row"> {order.order_id}</th>
                        <td>{order.master.master_name}</td>
                        <td>{order.customer.customer_name}</td>
                        <td>{order.city.city_name}</td>
                        <td>{constants.WORK_TYPES[order.work_id].key}</td>
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
                orders.loadNext === true &&
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={() => handleNextOrders()}> Еще заказы...</button>
                </div>
            }
            <InputOrder/>
        </div>
    )
}
export default ListOrders