import React, {useEffect} from 'react';
import '../Panel.css'
import * as constants from "../../../constants";
import {getOrdersIntoStore} from "../getData";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../../../http/headerPlaceholder.instance";

const MasterPanel = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.users.user.email)
    const isReady = useSelector(state => state.users)
    const orders = useSelector(state => state.orders.items)
    const cities = useSelector(state => state.cities.items)
    const master = useSelector(state => state.users.data?.master)
    const deps = useSelector(state => state.users.data?.deps)
    const {loadNext, page} = useSelector((state => state.orders))

    useEffect(async () => {
        if (orders.length <= 0) {
            instance({
                method: "get",
                url: `/masters/email/${email}`
            })
                .then(({data}) => {
                    dispatch({
                        type: constants.ACTIONS.USER.SET_DATA,
                        payload: data
                    })
                    getOrdersIntoStore(dispatch, page, 2, master?.master_id)
                })
        }
    }, [dispatch, page, email]);

    const handleNextOrders = (e) => {
        e.target.disabled = true
        getOrdersIntoStore(dispatch, page, 2, master.master_id)
            .then(() =>
                e.target.disabled = false)
    }

    const handleApproveOrder = (order) => {
        instance({
            method: "put",
            url: `/auth/approve-order/${order.order_id}`
        }).then(() =>
            dispatch({
                type: constants.ACTIONS.MASTERS.APPROVE_ORDER,
                payload: {...order, isDone: true}
            }))
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }

    return (
        <div className="router">
            <h2 className="text-left mt-5">Привет, {master?.master_name}</h2>
            {deps?.length > 0 ?
                <div>
                    <h2 className="text-left mt-5">Ваш список городов: </h2>
                    {
                        cities.map(c => {
                            if (deps?.include(c.city_id)) {
                                return <p>{c.city_name}</p>
                            }
                        })
                    }
                </div>
                : <div>
                    <h2 className="text-left mt-5">Ваш список городов пуст</h2>
                </div>
            }
            {orders.length > 0 ?
                <div>
                    <h2 className="text-left mt-5">Ваш список заказов: </h2>
                    <table className="table mt-5 text-justify">
                        <thead>
                        <tr>
                            <th scope="col"># заказа</th>
                            <th scope="col">Покупатель</th>
                            <th scope="col">Город</th>
                            <th scope="col">Тип работы</th>
                            <th scope="col">Дата заказа</th>
                            <th scope="col">Время начала</th>
                            <th scope="col">Время конца</th>
                            <th scope="col">Статус заказа</th>
                            <th scope="col">Сумма заказа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order => (
                            <tr key={order.order_id}>
                                <th scope="row"> {order.order_id}</th>
                                <td>{order.customer.customer_name}</td>
                                <td>{order.city.city_name}</td>
                                <td>{constants.WORK_TYPES[order.work_id].key}</td>
                                <td>{order.order_time.split('T')[0]}</td>
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + ":00:00"}</td>
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + Number(order.work_id) + ":00:00"}</td>
                                <td>{
                                    !order.isDone ?
                                        <button className="btn btn-outline-success"
                                                onClick={() => handleApproveOrder(order)}>
                                            Заказ выполнен!
                                        </button>
                                        : "Готово"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {
                        loadNext &&
                        <div className="col text-center">
                            <button className="btn btn-primary" onClick={(e) => handleNextOrders(e)}> Еще заказы...
                            </button>
                        </div>
                    }
                </div>
                : <div>
                    <h2 className="text-left mt-5">Ваш список заказов пуст</h2>
                </div>
            }
        </div>
    )
}


export default MasterPanel;