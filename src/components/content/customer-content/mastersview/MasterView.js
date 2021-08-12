import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import * as constants from "../../../../constants";
import {useLocation, Redirect} from 'react-router-dom'
import {getMasters, getCustomers, getOrders} from "../../getData";
import {SERVER_URL} from "../../../../constants";
import {logDOM} from "@testing-library/react";

function MasterView(props) {
    const [masters, setMasters] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            getMasters(setMasters)
            getOrders(setOrders)
            getCustomers(setCustomers)
        }
    }, [])

    async function handleClick(e) {

        if (!findUser()) {
            const body = {customer_name: location.state.data.name, customer_email: location.state.data.email}
            console.log(JSON.stringify(body))
            await fetch(constants.SERVER_URL + `/customers`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            getCustomers(setCustomers)
        }

        const order = location.state.data
        const T = order.date + "T" + order.time
        const customer = findUser()
        const body = {
            ...customer,
            master_id: e.target.value,
            city_id: order.city,
            order_time: T,
            work_id: order.type,
        }

        console.log( JSON.stringify(body))
        await fetch(SERVER_URL + `/orders`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
    }

    function findUser() {
        return customers.find(c => c.customer_email === location.state.data.email)
    }

    if (!location.state) {
        return (
            <Redirect to="/"/>
        )
    }

    const isMasterAvailable = (master) => {
        let flag = 0;
        orders.forEach(o => {
            {
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
            }
        })
        return flag !== 1;
    }

    const START_TIME = location.state.data.time
    const END_TIME = (Number(START_TIME.split(':')[0])
        + Number(constants.WORK_TYPES[location.state.data.type].value))
        + ":00"

    return (
        <div>
            <div>
                <h3>Выберите свободного мастера</h3>
                <p>Вы заказали
                    ремонт {constants.WORK_TYPES[location.state.data.type].message} на {location.state.data.date} в {START_TIME}-{END_TIME}</p>
            </div>
            <div>
                {
                    masters?.map((master) =>
                        <form key={master.master_id} id={master.master_id} className="mt-5">
                            <input value={master.master_name} readOnly/>
                            <input value={master.ranking} readOnly/>
                            <Button id={master.master_id} value={master.master_id} onClick={handleClick}
                                    disabled={!isMasterAvailable(master)}
                            >Выбрать</Button>
                        </form>
                    )
                }
            </div>
        </div>
    );
}

export default MasterView;