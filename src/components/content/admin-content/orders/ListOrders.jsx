import React, {useEffect} from "react";
import EditOrder from "./EditOrder";
import * as constants from "../../../../constants";
import {getOrdersIntoStore} from "../../getData";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {deleteOrder} from "../../workWithData";

const ListOrders = () => {
    const orders = useSelector((state => state.orders.items))
    const {isReady, loadNext, page} = useSelector((state => state.orders))
    const dispatch = useDispatch()

    useEffect(async () => {
        if (orders.length <= 0) {
            await getOrdersIntoStore(dispatch, page)
        }
    }, [dispatch])
    const handleNextOrders = async (e) => {
        e.target.disabled = true
        await getOrdersIntoStore(dispatch, page)
        e.target.disabled = false
    }
    if (!isReady) {
        return <Spinner animation="grow"/>
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
                {orders?.map(order => (
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
                                    onClick={() => deleteOrder(order.order_id, dispatch)}
                                    disabled={order.order_time.split('T')[0] <= constants.DATE_FROM}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {
                loadNext &&
                <div className="col text-center">
                    <button className="btn btn-primary mb-5" onClick={(e) => handleNextOrders(e)}> Еще заказы...</button>
                </div>
            }
        </div>
    )
}
export default ListOrders