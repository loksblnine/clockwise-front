import React, {Fragment, useContext, useEffect, useState} from 'react';
import * as constants from "../../../../constants";
import {SERVER_URL} from "../../../../constants";
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import {getDepsCityIdMasters} from "../../getData";
import './MasterView.css'
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const MasterView = observer(() => {
        const [listMastersInCityAvailable, setLMICA] = useState([]);
        const [ids, setIdsUnavailableMasters] = useState([])
        const [loading, setLoading] = useState(true)
        const {DB} = useContext(Context)
        const location = useLocation()
        const history = useHistory()
        const order = location.state.data

        useEffect(async () => {
            await fetch(constants.SERVER_URL + "/masters/free",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        work_id: order.type,
                        order_time: order.date + "T" + order.time
                    })
                })
                .then(resp => resp.json())
                .then(data => setIdsUnavailableMasters(data))
                .catch(err => {
                    return err
                });
            if (location.state) {
                axios.get(SERVER_URL + `/masters`)
                    .then(resp => DB.setMasters(resp.data))
                    .finally(() => setLoading(false))
                getDepsCityIdMasters(setLMICA, location.state.data.city)
            }
        }, [DB, location.state])
        const handleBack = () => {
            history.push({
                pathname: '/',
                state: location.state
            })
        }

        const handleClick = async (master) => {
            let customer = {customer_name: location.state.data.name, customer_email: location.state.data.email}

            await fetch(constants.SERVER_URL + `/customers/email/` + customer.customer_email)
                .then(resp => resp.json())
                .then(data => customer = data)
                .catch(async e => {
                    await fetch(SERVER_URL + `/customers`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(customer)
                    })
                        .then(resp => resp.json())
                        .then(data => customer = data);
                })
            const text = `Спасибо за заказ ${customer.customer_name}, мастер ${master.master_name} будет у вас ${order.date} в ${order.time}`
            const T = order.date + "T" + order.time

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
                toast.info("Возникли трудности c сервером")
            }
        }

        if (!location.state) {
            return (
                <Redirect to="/"/>
            )
        }

        const START_TIME = location.state.data.time
        const END_TIME = (Number(START_TIME.split(':')[0])
            + Number(constants.WORK_TYPES[location.state.data.type].value))
            + ":00"

        const mastersToShow =
            DB.masters
                .filter(m =>
                    listMastersInCityAvailable
                        .find(d => d === m.master_id))

        if (loading) {
            return (
                <div>
                    <Spinner animation={`grow`}/>
                </div>
            )
        }
        console.log(ids)

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
                        {mastersToShow
                            .map(master => (
                                <tr key={master.master_id}>
                                    <td>{master.master_name}</td>
                                    <td>{master.ranking}</td>
                                    <td>
                                        <button className="btn btn-success" id={master.master_id}
                                                value={master.master_id}
                                                onClick={e => handleClick(master)}
                                                disabled={false}
                                        >Выбрать
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {ids.map((id) =>
                            <p>{id}</p>
                        )}
                        </tbody>
                    </table>
                </Fragment>
                <button className="btn btn-primary" onClick={handleBack}>Назад
                </button>
            </div>
        );
    }
)

export default MasterView;