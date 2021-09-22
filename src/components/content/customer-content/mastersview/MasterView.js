import React, {Fragment, useEffect, useState} from 'react';
import * as constants from "../../../../constants";
import {useLocation, Redirect, useHistory} from 'react-router-dom'
import {getMasters, getCustomers, getOrders} from "../../getData";
import {SERVER_URL} from "../../../../constants";
import './MasterView.css'
import {toast} from "react-toastify";

function MasterView(props) {

    const [masters, setMasters] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        if (location.state) {
            getMasters(setMasters)
            getOrders(setOrders)
            getCustomers(setCustomers)
        }
    }, [location.state])

    const handleBack = (values) => {
        history.push({
            pathname: '/',
            state: location.state
        })
    }

    async function handleClick(e) {
        e.preventDefault()
        if (!findCustomer()) {
            const body = {customer_name: location.state.data.name, customer_email: location.state.data.email}
            await fetch(constants.SERVER_URL + `/customers`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            getCustomers(setCustomers)
        }

        const order = location.state.data
        order.time = (new Number(order.time.split(':')[0])+3)+":00"
        const T = order.date + "T" + order.time
        const customer = findCustomer()
        const master = findMaster(e.target.value)
        const text = `Спасибо за заказ ${customer.customer_name}, мастер ${master.master_name} будет у вас ${order.date} в ${order.time}`

        const bodyOrder = {
            master_id: master.master_id,
            customer_id: customer.customer_id,
            city_id: order.city,
            order_time: T,
            work_id: order.type,
        }
        const response = await fetch(SERVER_URL + `/orders`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyOrder)
        });
        if (response.status === 200) {
            const bodyMessage = {
                email: customer.customer_email,
                message: text
            }
            console.log(JSON.stringify(bodyMessage))
            const response = await fetch(SERVER_URL + `/send`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyMessage)
            });
            if (response.status === 200) {
                toast("Письмо отправлено вам на почту")
                history.goBack()
            }
        } else {
            toast("Возникли трудности")
        }
    }

    function findCustomer() {
        return customers.find(c => c.customer_email === location.state.data.email)
    }

    function findMaster(master_id) {
        return masters.find(m => {
            return m.master_id == master_id
        })
    }

    if (!location.state) {
        return (
            <Redirect to="/"/>
        )
    }

    const isMasterAvailable = (master) => {
        let flag = 0;
        orders.forEach(o => {
            if (o.master_id === master.master_id) {
                if (o.order_time.split('T')[0] === location.state.data.date) {
                    if (o.order_time.split('T')[1] > START_TIME
                        && o.order_time.split('T')[1] < END_TIME
                    ) {
                        flag++
                        return
                    }
                }
            }

        })
        return flag !== 1;
    }

    const START_TIME = location.state.data.time
    const END_TIME = (Number(START_TIME.split(':')[0])
        + Number(constants.WORK_TYPES[location.state.data.type].value))
        + ":00"

    return (
        <div className={`content`}>
            <div>
                <h3>Выберите свободного мастера</h3>
                <p>Вы заказали
                    ремонт {constants.WORK_TYPES[location.state.data.type].message} на {location.state.data.date} в {START_TIME}-{END_TIME}</p>
            </div>
            <Fragment>
                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Рейтинг</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {masters.map(master => (
                        <tr key={master.master_id}>
                            <td>{master.master_name}</td>
                            <td>{master.ranking}</td>
                            <td>
                                <button className="btn btn-success" id={master.master_id} value={master.master_id}
                                        onClick={e => handleClick(e)}
                                        disabled={!isMasterAvailable(master)}
                                >Выбрать
                                </button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </Fragment>
            <button className="btn btn-primary" onClick={handleBack}>Назад
            </button>
        </div>
    );
}

export default MasterView;