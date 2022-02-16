import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {setUserData} from "../../../../store/actions/userActions";
import {setOrdersMaster} from "../../../../store/actions/orderActions";
import {setCities} from "../../../../store/actions/cityActions";
import ModalSeeOrder from "./ModalSeeOrder";
import {setTypes} from "../../../../store/actions/typeActions";
import ModalApprove from "./ModalApprove";
import {STAR} from "../../../../utils/svg_constants";

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
    const types = useSelector((state) => state.types.items)
    const email = useSelector((state) => state.users.user.email)
    const master = useSelector((state) => state.users.data?.master)
    const {loadNext, page} = useSelector((state) => state.orders)

    useEffect(() => {
        if (types.length <= 0) {
            dispatch(setTypes())
        }
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
                            <th scope="col">Полный заказ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders?.map(order => (
                            <tr key={order?.order_id}>
                                <th scope="row"> {order?.order_id}</th>
                                <td>{order?.customer?.customer_name}</td>
                                <td>{order?.city?.city_name}</td>
                                <td>{types.filter(t => Number(t.work_id) === Number(order?.work_id))[0].description}</td>
                                <td>{order?.order_time?.split('T')[0]}</td>
                                <td>{Number(order?.order_time?.split('T')[1].split(':')[0]) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{Number(order?.order_time?.split('T')[1].split(':')[0]) + Number(order.work_id) + ":" + order.order_time.split('T')[1].split(':')[1]}</td>
                                <td>{
                                    !order.isDone ?
                                        <ModalApprove order={order}/>
                                        : order.mark ?
                                        <DisplayMark mark={order.mark}/>
                                        : "Готово"
                                }</td>
                                <td><ModalSeeOrder order={order}/></td>
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
