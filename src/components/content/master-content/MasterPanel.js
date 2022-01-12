import React, {useCallback, useEffect, useState} from 'react';
import * as constants from "../../../utils/constants";
import {COLLAPSE_ARROWS, EXPAND_ARROWS, STAR} from "../../../utils/svg_constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../store/actions/orderActions";
import {deleteMasterCity, setUserData} from "../../../store/actions/userActions";
import {setCities} from "../../../store/actions/cityActions";
import {approveOrder} from "../../../store/actions/masterActions";
import AddCity from "./AddCity";
import EditProfileMaster from "./EditProfileMaster";

const DisplayMark = ({mark}) => {
    return (
        <div>
            {mark} &nbsp; {STAR}
        </div>
    )
}

const ModalApprove = ({order}) => {
    const dispatch = useDispatch()
    const handleApproveOrder = (order) => {
        dispatch(approveOrder(order.order_id))
    }
    return (
        <div>
            <button type="button" className="btn btn-outline-success"
                    data-toggle="modal"
                    data-target={`#id${order.order_id}`}>
                Заказ выполнен!
            </button>
            <div className="modal fade" id={`id${order.order_id}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h3 className="modal-title"
                                    id="exampleModalLabel">Подтвердить выполнение
                                    заказа?</h3>
                                <button type="button" className="btn-close"
                                        data-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger"
                                        data-dismiss="modal"
                                >Нет, отмена
                                </button>
                                <button type="button" className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={() => handleApproveOrder(order)}
                                >Да!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MasterPanel = () => {
    const dispatch = useDispatch()
    const isReady = useSelector((state) => state.users)
    const orders = useSelector((state) => state.orders.items)
    const ordersReady = useSelector((state) => state.orders.isReady)
    const cities = useSelector((state) => state.cities.items)
    const deps = useSelector((state) => state.users.data?.deps)
    const master = useSelector((state) => state.users.data?.master)
    const email = useSelector((state) => state.users.user.email)
    const {loadNext, page} = useSelector((state) => state.orders)
    const [openFilter, setOpenFilter] = useState(false)

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
            <div className="d-flex">
                <h2 className="text-left mt-5">Привет, {master?.master_name}</h2>
                {master?.email && <EditProfileMaster master={master}/>}
            </div>
            {deps?.length > 0 ?
                <div>
                    <button className="btn mt-4" type="button" data-toggle="collapse"
                            data-target="#Filter" onClick={(e) => {
                        e.preventDefault()
                        setOpenFilter(!openFilter)
                    }}
                            aria-controls="Filter"><span className="font-size:bigger">Ваш список городов: &nbsp;</span>
                        {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
                    </button>
                    {openFilter &&
                    <div id="Filter mt-4">
                        <div className="form-group">
                            <div className="form-group">
                                <ul className="list-group-row">
                                    {
                                        deps.map((d) => {
                                            return (
                                                <div key={d}
                                                     className="col-md-4 p-2">
                                                    {cities?.find(c => c.city_id === d)?.city_name}
                                                    <button className="btn"
                                                            onClick={() => dispatch(deleteMasterCity({
                                                                city_id: d,
                                                                master_id: master.master_id
                                                            }))}>
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <AddCity master={master}/>
                    </div>
                    }</div>
                : <div>
                    <h4 className="text-left mt-5">Ваш список городов пуст</h4>
                    <AddCity master={master}/>
                </div>
            }
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
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + Number(order.work_id) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{
                                    !order.isDone ?
                                        <ModalApprove order={order}/>
                                        : order.mark ?
                                        <DisplayMark mark={order.mark}/>
                                        : "Готово"}
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
    )
}

export default MasterPanel;
