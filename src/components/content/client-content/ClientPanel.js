import React, {useEffect} from 'react';
import '../Panel.css'
import * as constants from "../../../constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../../../http/headerPlaceholder.instance";
import {setOrdersCustomer} from "../../../store/actions/orderActions";


const ClientPanel = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.users.user.email)
    const isReady = useSelector((state) => state.users)
    const orders = useSelector((state) => state.orders.items)
    const customer = useSelector((state) => state.users.data)

    const {loadNext, page} = useSelector((state) => state.orders)

    useEffect(() => {
        if (orders.length <= 0) {
            instance({
                method: "get",
                url: `/customers/email/${email}`
            })
                .then(({data}) => {
                    dispatch({
                        type: constants.ACTIONS.USER.SET_DATA,
                        payload: data
                    })
                    dispatch(setOrdersCustomer(page, customer.customer_id))
                })
        }
    }, [dispatch, email, page]);

    const handleNextOrders = (e) => {
        e.target.disabled = true
        dispatch(setOrdersCustomer(page, customer.customer_id))
        e.target.disabled = false
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }

    return (
        <div className="router">
            <h2 className="text-left mt-5">Привет, {customer.customer_name}</h2>
            {orders.length > 0 &&
                <div>
                    <h2 className="text-left mt-5">Ваш список заказов</h2>
                    <table className="table mt-5 text-justify">
                        <thead>
                        <tr>
                            <th scope="col"># заказа</th>
                            <th scope="col">Мастер</th>
                            <th scope="col">Город</th>
                            <th scope="col">Тип работы</th>
                            <th scope="col">Дата заказа</th>
                            <th scope="col">Время заказа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order => (
                            <tr key={order.order_id}>
                                <th scope="row"> {order.order_id}</th>
                                <td>{order.master.master_name}</td>
                                <td>{order.city.city_name}</td>
                                <td>{constants.WORK_TYPES[order.work_id].key}</td>
                                <td>{order.order_time.split('T')[0]}</td>
                                <td>{order.order_time.split('T')[1].split('.')[0]}</td>
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
                || <div>
                    <h2 className="text-left mt-5">Ваш список заказов пуст</h2>
                </div>}
        </div>
    )
}


export default ClientPanel;