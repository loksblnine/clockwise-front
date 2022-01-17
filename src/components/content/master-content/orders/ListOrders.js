import React, {useCallback, useEffect, useState} from 'react';
import {COLLAPSE_ARROWS, EXPAND_ARROWS, STAR} from "../../../../utils/svg_constants";
import {deleteMasterCity, setUserData} from "../../../../store/actions/userActions";
import AddCity from "../edit/AddCity";
import * as constants from "../../../../utils/constants";
import ModalApprove from "./ModalApprove";
import PaymentDetails from "../../customer-content/Payment/PaymentDetails";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../../store/actions/orderActions";
import {Spinner} from "react-bootstrap";
import {setCities} from "../../../../store/actions/cityActions";

const DisplayMark = ({mark}) => {
    return (
        <div>
            {mark} &nbsp; {STAR}
        </div>
    )
}

const ListOrders = () => {
    const dispatch = useDispatch()
    const isReady = useSelector((state) => state.users)
    const ordersReady = useSelector((state) => state.orders.isReady)
    const orders = useSelector((state) => state.orders.items)
    const cities = useSelector((state) => state.cities.items)
    const master = useSelector((state) => state.users.data?.master)
    const email = useSelector((state) => state.users.user.email)
    const {loadNext, page} = useSelector((state) => state.orders)

    useEffect(() => {
        if (!master?.master_id)
            dispatch(setUserData("masters", email))
        if (cities.length <= 0)
            dispatch(setCities())
        if (master?.master_id && orders.length <= 0)
            dispatch(setOrdersMaster(page, master?.master_id))
    }, [dispatch, master, master?.master_id]);
    const handleNextOrders = useCallback((e) => {
        e.target.disabled = true
        dispatch(setOrdersMaster(page, master.master_id))
        e.target.disabled = false
    }, [dispatch, page, master?.master_id])

    if (!isReady && !ordersReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            {orders.length > 0 ?
                <div>
                    <h4 className="text-left mt-5">Ваш список заказов: </h4>
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
                            <th scope="col">Статус оплаты</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order => (
                            <tr key={order?.order_id}>
                                <th scope="row"> {order?.order_id}</th>
                                <td>{order?.customer?.customer_name}</td>
                                <td>{order?.city?.city_name}</td>
                                <td>{constants.WORK_TYPES[order.work_id].key}</td>
                                <td>{order?.order_time?.split('T')[0]}</td>
                                <td>{Number(order?.order_time?.split('T')[1].split(':')[0]) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{Number(order?.order_time?.split('T')[1].split(':')[0]) + Number(order.work_id) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{
                                    !order.isDone ?
                                        <ModalApprove order={order}/>
                                        : order.mark ?
                                        <DisplayMark mark={order.mark}/>
                                        : "Готово"}
                                </td>
                                <td>
                                    {
                                        !order?.isPaid ?
                                            "Не оплачено"
                                            : <PaymentDetails order={order}/>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {
                        loadNext &&
                        <div className="col text-center">
                            <button className="btn btn-primary"
                                    onClick={(e) => handleNextOrders(e)}> Еще заказы...
                            </button>
                        </div>
                    }
                </div>
                : <div>
                    <h4 className="text-left mt-5">Ваш список заказов пуст</h4>
                </div>
            }
        </div>
    );
};

export default ListOrders;
