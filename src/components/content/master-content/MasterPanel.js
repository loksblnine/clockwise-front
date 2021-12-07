import React, {useEffect, useState} from 'react';
import '../Panel.css'
import * as constants from "../../../constants";
import {getOrdersIntoStore} from "../getData";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../../../http/headerPlaceholder.instance";


const MasterPanel = () => {
    const dispatch = useDispatch()
    const role = useSelector(state => state.users.user.role)
    const email = useSelector(state => state.users.user.email)
    const isReady = useSelector(state => state.users)
    const orders = useSelector(state => state.orders.items)

    const [master, setMaster] = useState({})
    const {page} = useSelector((state => state.orders))

    useEffect(async () => {
        instance({
            method: "post",
            data: {email},
            url: `/masters/email`
        })
            .then(({data}) => {
                setMaster(data)
                getOrdersIntoStore(dispatch, page, role, data.master_id)
            })
            .catch(() => {
                setMaster({master_name: email})
            })

    }, []);

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Привет, {master.master_name}</h2>

            <div>
                <h2 className="text-left mt-5">Ваш список заказов</h2>
                <table className="table mt-5 text-justify">
                    <thead>
                    <tr>
                        <th scope="col"># заказа</th>
                        <th scope="col">Покупатель</th>
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
                            <td>{order.customer.customer_name}</td>
                            <td>{order.city.city_name}</td>
                            <td>{constants.WORK_TYPES[order.work_id].key}</td>
                            <td>{order.order_time.split('T')[0]}</td>
                            <td>{order.order_time.split('T')[1].split('.')[0]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/*{*/}
                {/*    loadNext &&*/}
                {/*    <div className="col text-center">*/}
                {/*        <button className="btn btn-primary" onClick={(e) => handleNextOrders(e)}> Еще заказы...*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </div>
    )
}


export default MasterPanel;