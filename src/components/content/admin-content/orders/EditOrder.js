import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import * as constants from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {getOrdersIntoStore} from "../../getData";

const EditOrder = observer((initialOrder) => {
    const {DB} = useContext(Context)
    const inputRef = React.useRef(null)
    const [order, setOrder] = useState({
        ...initialOrder.order,
        date: initialOrder.order?.order_time?.split('T')[0],
        time: initialOrder.order?.order_time?.split('T')[1]?.split('.')[0]
    });

    const updateOrder = async (e) => {
        e.preventDefault()
        try {
            const body = {order}
            body.order.time = `${Number(body.order.time.split(':')[0])}:00`
            body.order.order_time = body.order.date + 'T' + body.order.time
            await fetch(SERVER_URL + `/orders/${order.order_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }, body: JSON.stringify(body.order)
            })
                .then(response => response.json())
                .then(data => toast(data));
            await getOrdersIntoStore()
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
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
            {order.date > constants.DATE_FROM ?
                <button type="button" className="btn btn-warning" data-toggle="modal"
                        data-target={`#id_edit${order.order_id}`}>
                    Редактировать
                </button>
                : <button type="button" className="btn btn-info" data-toggle="modal"
                          data-target={`#id_see${order.order_id}`}>
                    Посмотреть
                </button>}

            <div className="modal fade" id={`id_edit${order.order_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => updateOrder(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать заказ</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Имя мастера</label>
                                <select className="form-control" value={order.master_id} name="master_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать мастера---</option>
                                    {DB.masters?.map(master =>
                                        <option key={master.master_id}
                                                value={master.master_id}>{master.master_name} </option>)}
                                </select>

                                <label>Имя покупателя</label>
                                <select className="form-control" value={order.customer_id} name="customer_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать покупателя---</option>
                                    {DB.customers?.map(customer =>
                                        <option key={customer.customer_id}
                                                value={customer.customer_id}>{customer.customer_name} </option>)}
                                </select>

                                <label>Город</label>
                                <select className="form-control" value={order.city_id} name="city_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать город---</option>
                                    {DB.cities?.map(city =>
                                        <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
                                </select>

                                <label>Тип работы</label>
                                <select className="form-control" value={order.work_id} name="work_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать тип работы---</option>
                                    <option key="1" value="1">Маленькие часы</option>
                                    <option key="2" value="2">Средние часы</option>
                                    <option key="3" value="3">Большие часы</option>
                                </select>

                                <label className="text" htmlFor="date">Введите дату заказа </label>
                                <input type="date" name="date" value={order.date}
                                       className="form-control react-datetime-picker"
                                       min={constants.DATE_FROM} max={constants.DATE_TO}
                                       required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                                       onChange={handleChange}/>

                                <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                                <input type="time" name="time" className="form-control timepicker"
                                       min={constants.TIME_FROM} max={constants.TIME_TO}
                                       value={order.time}
                                       required step="3600"
                                       pattern="([01]?[0-9]|2[0-3]):[0][0]" id="24h"
                                       onChange={handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary" id={`btnSave`}>
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={`id_see${order.order_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Просмотр заказа</h2>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Имя мастера</label>
                            <select className="form-control" value={order.master_id} name="master_id"
                                    disabled>
                                {DB.masters?.map(master =>
                                    <option key={master.master_id}
                                            value={master.master_id}>{master.master_name} </option>)}
                            </select>
                            <label>Имя покупателя</label>
                            <select className="form-control" value={order.customer_id} name="customer_id"
                                    disabled>
                                {DB.customers?.map(customer =>
                                    <option key={customer.customer_id}
                                            value={customer.customer_id}>{customer.customer_name} </option>)}
                            </select>

                            <label>Город</label>
                            <select className="form-control" value={order.city_id} name="city_id"
                                    disabled>
                                {DB.cities?.map(city =>
                                    <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
                            </select>

                            <label>Тип работы</label>
                            <select className="form-control" value={order.work_id} name="work_id"
                                    disabled>
                                <option key="1" value="1">Маленькие часы</option>
                                <option key="2" value="2">Средние часы</option>
                                <option key="3" value="3">Большие часы</option>
                            </select>

                            <label className="text" htmlFor="date">Введите дату заказа </label>
                            <input type="date" name="date" value={order.date}
                                   className="form-control react-datetime-picker"
                                   readOnly/>

                            <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                            <input type="time" name="time" className="form-control timepicker"
                                   min={constants.TIME_FROM} max={constants.TIME_TO}
                                   value={order.time}
                                   readOnly/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
})

export default EditOrder;