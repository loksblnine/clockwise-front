import React, {Fragment, useEffect, useState} from "react";
import * as constants from "../../../../constants";
import {getCities, getCustomers, getMasters, getOrders} from "../../getData";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const InputOrder = () => {
    const history = useHistory()

    const [cities, setCities] = useState([]);
    const [masters, setMasters] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);

    const [order, setOrder] = useState({
        customer_id: "",
        master_id: "",
        city_id: "",
        work_id: '1',
        date: '',
        time: ''
    });

    useEffect(() => {
        getCities(setCities)
        getMasters(setMasters)
        getCustomers(setCustomers)
        getOrders(setOrders)
    }, [])

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {order}
            body.order.time = (new Number(body.order.time.split(':')[0])+3)+":00"
            body.order.order_time = body.order.date + 'T' + body.order.time
            console.log(JSON.stringify(body.order))
            await fetch(constants.SERVER_URL + `/orders`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body.order)
            })
                .then(response => response.json())
                .then(data => console.log(data));
            history.go(0)
        } catch (e) {
            toast(e.message)
        }
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal"
                    data-target="#addOrder">
                Добавить
            </button>

            <div className="modal fade" id="addOrder" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Добавить заказ</h1>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Имя мастера</label>
                                <select className="form-control" name={`master_id`}
                                        id={`master_id`} defaultValue={`-1`}
                                        onChange={handleChange} required>
                                    <option value={`-1`} disabled={true}>---Выбрать мастера---</option>
                                    {masters?.map(master =>
                                        <option key={master.master_id}
                                                value={master.master_id}>{master.master_name} </option>)}
                                </select>

                                <label>Имя покупателя</label>
                                <select className="form-control" name={`customer_id`}
                                        defaultValue={`-1`}
                                        onChange={handleChange} required>
                                    <option value={`-1`} disabled={true}>---Выбрать покупателя---</option>
                                    {customers?.map(customer =>
                                        <option key={customer.customer_id}
                                                value={customer.customer_id}>{customer.customer_name} </option>)}
                                </select>

                                <label>Город</label>
                                <select className="form-control" name={`city_id`} defaultValue={`-1`}
                                        onChange={handleChange} required>
                                    <option value={`-1`} disabled={true}>---Выбрать город---</option>
                                    {cities?.map(city =>
                                        <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
                                </select>

                                <label>Тип работы</label>
                                <select className="form-control" value={order.work_id} name={`work_id`}
                                        onChange={handleChange} required>
                                    <option value={`-1`} disabled={true}>---Выбрать тип работы---</option>
                                    <option key={`1`} value={`1`}>Маленькие часы</option>
                                    <option key={`2`} value={`2`}>Средние часы</option>
                                    <option key={`3`} value={`3`}>Большие часы</option>
                                </select>

                                <label className={`text`} htmlFor={`date`}>Введите дату заказа </label>
                                <input type={`date`} name={`date`} value={order?.order_time?.split('T')[0]}
                                       className={`form-control react-datetime-picker`}
                                       min={constants.DATE_FROM} max={constants.DATE_TO}
                                       required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                                       onChange={handleChange}/>

                                <label className={`text`} htmlFor={`time`}>Время заказа (8:00 - 17:00) </label>
                                <input type={`time`} name={`time`} className={`form-control timepicker`}
                                       min={constants.TIME_FROM} max={constants.TIME_TO}
                                       value={order?.order_time?.split('T')[1]?.split('.')[0]}
                                       required step='3600'
                                       pattern="([01]?[0-9]|2[0-3]):[0][0]" id="24h"
                                       onChange={handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InputOrder;