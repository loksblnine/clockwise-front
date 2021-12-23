import React, {useCallback, useEffect, useState} from 'react';
import '../Panel.css'
import * as constants from "../../../utils/constants";
import {ARROWS_SVG} from "../../../utils/constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersCustomer, sortOrders} from "../../../store/actions/orderActions";
import {setUserData} from "../../../store/actions/userActions";
import SetMarkDialog from "./SetMarkDialog";
import EditProfileClient from "./EditProfileClient";

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
        <div className="router">
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
                                <td>{order?.isDone ? order?.mark ? (
                                        <div>
                                            {order.mark} &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-star" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                            </svg>
                                        </div>
                                    ) :
                                    <SetMarkDialog order={order}/>
                                    : "Не готов"}</td>
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
