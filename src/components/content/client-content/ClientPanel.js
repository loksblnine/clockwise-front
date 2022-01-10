import React, {useCallback, useEffect, useState} from 'react';
import * as constants from "../../../utils/constants";
import {ARROWS_SVG, STAR} from "../../../utils/constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersCustomer, sortOrders} from "../../../store/actions/orderActions";
import {setUserData} from "../../../store/actions/userActions";
import SetMarkDialog from "./SetMarkDialog";
import EditProfileClient from "./EditProfileClient";

const OrderMark = ({mark}) => {
    return (
        <div>
            {mark} &nbsp; {STAR}
        </div>
    )
}

const ClientPanel = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.users.user.email)
    const isReady = useSelector((state) => state.users)
    const orders = useSelector((state) => state.orders.items)
    const customer = useSelector((state) => state.users.data)
    const {loadNext, page} = useSelector((state) => state.orders)

    const initSortParams = {
        order_id: '',
    }
    const [sortParams, setSortParams] = useState(initSortParams)
    useEffect(() => {
        if (!customer?.customer_id)
            dispatch(setUserData("customers", email))
        if (customer?.customer_id && orders.length <= 0)
            dispatch(setOrdersCustomer(page, customer?.customer_id))
    }, [customer.customer_name, customer.customer_email, customer?.master_id, sortParams]);

    const handleNextOrders = useCallback((e) => {
        e.target.disabled = true
        dispatch(setOrdersCustomer(page, customer?.customer_id))
        e.target.disabled = false
    }, [page])

    const handleSort = (e, paramName) => {
        e.preventDefault()
        switch (paramName) {
            case "order_id": {
                setSortParams(prevState => ({
                    order_id: prevState.order_id === "ASC" ? "DESC" : "ASC"
                }))
                dispatch(sortOrders(["order_id", sortParams.order_id]))
                break
            }
            default: {
                break
            }
        }
    }
    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h2 className="text-left mt-5">Привет, {customer.customer_name}</h2>
            {customer?.customer_email && <EditProfileClient customer={customer}/>}
            {orders.length > 0 ?
                <div>
                    <h2 className="text-left mt-5">Ваш список заказов</h2>
                    <table className="table mt-5 text-justify">
                        <thead>
                        <tr>
                            <th scope="col" onClick={(e) => handleSort(e, "order_id")}>
                                # заказа {sortParams.order_id === "ASC" ? ARROWS_SVG.ASC : ARROWS_SVG.DESC}</th>
                            <th scope="col"> Мастер</th>
                            <th scope="col"> Город</th>
                            <th scope="col"> Тип работы</th>
                            <th scope="col"> Дата заказа</th>
                            <th scope="col">Время начала</th>
                            <th scope="col">Время окончания</th>
                            <th scope="col"> Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order => (
                            <tr key={order?.order_id}>
                                <th scope="row"> {order?.order_id}</th>
                                <td>{order?.master?.master_name}</td>
                                <td>{order?.city?.city_name}</td>
                                <td>{constants.WORK_TYPES[order?.work_id].key}</td>
                                <td>{order?.order_time?.split('T')[0]}</td>
                                <td>{order?.order_time?.split('T')[1].split('.')[0]}</td>
                                <td>{Number(order?.order_time?.split('T')[1]?.split(':')[0]) + Number(order?.work_id) + ":00:00"}</td>
                                <td>
                                    {
                                        order?.isDone
                                            ? order?.mark
                                            ? <OrderMark mark={order.mark}/>
                                            : <SetMarkDialog order={order}/>
                                            : "Не готов"
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {
                        loadNext &&
                        <div className="col text-center">
                            <button className="btn btn-primary mb-5" onClick={(e) => handleNextOrders(e)}> Еще заказы...
                            </button>
                        </div>
                    }
                </div>
                : <div>
                    <h2 className="text-left mt-5">Ваш список заказов пуст</h2>
                </div>}
        </div>
    )
}

export default ClientPanel;
