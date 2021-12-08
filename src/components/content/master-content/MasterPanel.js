import React, {useEffect} from 'react';
import '../Panel.css'
import * as constants from "../../../constants";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../store/actions/orderActions";
import {setUserData} from "../../../store/actions/userActions";
import {setCities} from "../../../store/actions/cityActions";
import {approveOrder, deleteCityAtMaster} from "../../../store/actions/masterActions";

const MasterPanel = () => {
    const dispatch = useDispatch()
    const isReady = useSelector((state) => state.users)

    const orders = useSelector((state) => state.orders.items)
    const ordersReady = useSelector((state) => state.orders.isReady)
    const cities = useSelector((state) => state.cities.items)

    const deps = useSelector((state) => state.users.data?.deps)
    const master = useSelector((state) => state.users.data?.master)

    const email = useSelector((state) => state.users.user.email) //todo reselect (useMemo - args) (useCallback - function)

    const {loadNext, page} = useSelector((state) => state.orders)

    useEffect(async () => {
        if (!master?.master_id)
            await dispatch(setUserData("masters", email))
        if (cities.length <= 0)
            dispatch(setCities())
        if (master?.master_id && orders.length <= 0)
            dispatch(setOrdersMaster(page, master?.master_id))
    }, [master, master?.master_id]);

    const handleNextOrders = (e) => {
        e.target.disabled = true
        dispatch(setOrdersMaster(page, master.master_id))
        e.target.disabled = false
    }
    const handleApproveOrder = (order) => {
        dispatch(approveOrder(order.order_id))
    }
    if (!isReady && !ordersReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Привет, {master?.master_name}</h2>
            {deps?.length > 0 ?
                <div>
                    <h4 className="text-left mt-5">Ваш список городов: </h4>
                    {
                        deps.map(d => {
                            return <div key={d}>
                                {cities.find(c => c.city_id === d)?.city_name}
                                <button className="btn"
                                        onClick={() => dispatch(deleteCityAtMaster({
                                            city_id: d,
                                            master_id: master.master_id
                                        }))}>
                                    <span>&times;</span>
                                </button>
                            </div>
                        })
                    }
                </div>
                : <div>
                    <h4 className="text-left mt-5">Ваш список городов пуст</h4>
                </div>
            }
            {/*{isReady && <AddCityDependency master={master}/>}*/}
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
                    <h4 className="text-left mt-5">Ваш список заказов пуст</h4>
                </div>
            }
        </div>
    )
}


export default MasterPanel;