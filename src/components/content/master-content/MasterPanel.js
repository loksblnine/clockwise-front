import React, {useCallback, useEffect, useState} from 'react';
import '../Panel.css'
import * as constants from "../../../utils/constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../store/actions/orderActions";
import {deleteMasterCity, setUserData} from "../../../store/actions/userActions";
import {setCities} from "../../../store/actions/cityActions";
import {approveOrder} from "../../../store/actions/masterActions";
import AddCity from "./AddCity";
import EditProfileMaster from "./EditProfileMaster";

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
    }, [dispatch, page, master.master_id])

    const handleApproveOrder = useCallback((order) => {
        dispatch(approveOrder(order.order_id))
    }, [dispatch])

    if (!isReady && !ordersReady) {
        return <Spinner animation="grow"/>
    }

    return (
        <div className="router">
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
                        {!openFilter ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-arrows-expand" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-arrows-collapse" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"/>
                            </svg>}
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
                                                         className={`col-md-4 p-2`}>
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
                            <div className="col-4">
                                <AddCity master={master}/>
                            </div>
                        </div>
                    }</div>
                : <div>
                    <h4 className="text-left mt-5">Ваш список городов пуст</h4>
                    <div className="router">
                        <AddCity master={master}/>
                    </div>
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
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + ":00:00"}</td>
                                <td>{Number(order.order_time.split('T')[1].split(':')[0]) + Number(order.work_id) + ":00:00"}</td>
                                <td>{
                                    !order.isDone ?
                                        <button className="btn btn-outline-success"
                                                onClick={() => handleApproveOrder(order)}>
                                            Заказ выполнен!
                                        </button>
                                        : order.mark ?
                                            <div>
                                                {order.mark} &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-star" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                            </div>
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
                    <h4 className="text-left mt-5">Ваш список заказов пуст</h4>
                </div>
            }
        </div>
    )
}

export default MasterPanel;
