import React, {Fragment, useEffect, useState} from 'react';
import * as constants from "../../../../constants";
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import './MasterView.css'
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {instance} from "../../../../http/headerPlaceholder.instance";

const MasterView = observer(() => {
        const [masters, setMasters] = useState([])
        const [loading, setLoading] = useState(true)
        const [isMessage, setIsMessage] = useState(false)

        const location = useLocation()
        const history = useHistory()

        const order = location.state.data
        const [customer, setCustomer] = useState({customer_name: order.name, customer_email: order.email})

        useEffect(async () => {
            const T = order.date + "T" + order.time
            const orderBody = {
                city_id: order.city,
                order_time: T,
                work_id: order.type,
            }
            instance({
                method: "post",
                data: orderBody,
                url: `/masters/free`,
            })
                .then(resp => setMasters(resp.data))
                .catch(err => {
                    return err
                })
                .finally(() =>
                    setLoading(false))
        }, [location.state])
        const handleBack = () => {
            history.push({
                pathname: '/',
                state: location.state
            })
        }

        const handleClick = async (master) => {
            instance({
                method: "POST",
                data: customer,
                url: `/customers/email`,
            })
                .then(resp => setCustomer(resp.data))
            const text = `Спасибо за заказ ${customer.customer_name}, мастер ${master["master.master_name"]} будет у вас ${order.date} в ${order.time}`
            const T = order.date + "T" + order.time
            const orderBody = {
                master_id: master.master_id,
                customer_id: customer.customer_id,
                city_id: order.city,
                order_time: T,
                work_id: order.type,
            }
            instance({
                method: "POST",
                data: orderBody,
                url: "/orders"
            })
                .then(() => {
                    const messageBody = {
                        email: customer.customer_email,
                        message: text
                    }
                    instance({
                        method: "POST",
                        data: messageBody,
                        url: "/send"
                    })
                        .then(() => setIsMessage(true))
                        .then(() => {
                            toast("Письмо отправлено вам на почту")
                            history.goBack()
                        })
                })
                .catch(() => {
                    toast.info("Возникли трудности c сервером")
                }).finally(() => setIsMessage(false))
        }

        if (!location.state) {
            return (
                <Redirect to="/"/>
            )
        }

        if (loading) {
            return (
                <div>
                    <Spinner animation="grow"/>
                </div>
            )
        }
        console.log(masters)
        return (
            <div className={`content`}>
                <div>
                    <h3>Выберите свободного мастера</h3>
                    <p>Вы заказали
                        ремонт {constants.WORK_TYPES[location.state.data.type].message} на {location.state.data.date} в {location.state.data.time}</p>
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
                        {masters?.map(elem => (
                            <tr key={elem.master_id}>
                                <td>{elem["master.master_name"]}</td>
                                <td>{elem["master.ranking"]}</td>
                                <td>
                                    <button className="btn btn-success" id={elem["master.master_id"]}
                                            value={elem["master.master_id"]}
                                            onClick={e => handleClick(elem)}
                                    >Выбрать
                                    </button>
                                    {
                                        isMessage &&
                                        <Spinner animation="grow"/>
                                    }
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
)

export default MasterView;