import React, {useCallback, useState} from "react";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addOrder} from "../../../../store/actions/orderActions";
import {DATE_FROM, DATE_TO, datePattern} from "../../../../utils/constants";

const InputOrder = () => {
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()
    const cities = useSelector(state => state.cities)
    const customers = useSelector(state => state.customer)
    const masters = useSelector(state => state.masters)

    const [order, setOrder] = useState({
        customer_id: -1,
        master_id: -1,
        city_id: -1,
        work_id: 1,
        date: '',
        time: ''
    });

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        const body = {order}
        body.order.time = `${Number(body.order.time.split(':')[0])}:00`
        body.order.order_time = body.order.date + 'T' + body.order.time
        dispatch(addOrder(body.order))
        inputRef.current.click()
    }, [order])
    const isMasterSelected = useCallback(() => {
        return order.master_id !== -1
    }, [order.master_id])
    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, [])
    if (!(cities?.isReady && customers?.isReady && masters?.isReady)) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target="#addOrder">
                Добавить
            </button>

            <div className="modal fade" id="addOrder" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden={true}>
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
                                <select className="form-control" name="master_id"
                                        id="master_id" defaultValue="-1"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать мастера---</option>
                                    {masters.items?.map(master =>
                                        <option key={master.master_id}
                                                value={master.master_id}>{master.master_name} </option>)}
                                </select>

                                <label>Имя покупателя</label>
                                <select className="form-control" name="customer_id"
                                        defaultValue="-1"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать покупателя---</option>
                                    {customers.items?.map(customer =>
                                        <option key={customer.customer_id}
                                                value={customer.customer_id}>{customer.customer_name} </option>)}
                                </select>

                                <label>Город</label>
                                <select className="form-control" name="city_id" defaultValue="-1"
                                        onChange={handleChange} required disabled={isMasterSelected()}>
                                    <option value="-1" disabled={true}>---Выбрать город---</option>
                                    {cities.items?.filter(c => masters.find(m => m.master_id === order.master_id).deps.includes(c.city_id)).map(city =>
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
                                <input type="date" name="date" value={order?.order_time?.split('T')[0]}
                                       className="form-control react-datetime-picker"
                                       min={DATE_FROM} max={DATE_TO}
                                       required pattern={datePattern}
                                       onChange={handleChange}/>

                                <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                                <input type="time" name="time" className="form-control timepicker"
                                       value={order?.order_time?.split('T')[1]?.split('.')[0]}
                                       required step="3600"
                                       id="24h"
                                       onChange={handleChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        disabled={order.master_id === -1 || order.city_id === -1 || order.customer_id === -1 || !order.work_id}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InputOrder;
