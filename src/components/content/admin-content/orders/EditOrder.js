import React, {useCallback, useEffect, useState} from "react";
import * as constants from "../../../../utils/constants";
import {datePattern} from "../../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {updateOrder} from "../../../../store/actions/orderActions";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {setMasters} from "../../../../store/actions/masterActions";

const EditOrder = (initialOrder) => {
    const [data, setData] = useState(null)
    const cities = useSelector((state) => state.cities.items)
    const masters = useSelector((state) => state.masters.items)
    const dispatch = useDispatch()
    const {loadNext, page} = useSelector((state) => state.masters)
    const [photo, setPhoto] = useState([])
    const inputRef = React.useRef(null)

    const [order, setOrder] = useState({
        ...initialOrder.order,
        date: initialOrder.order?.order_time?.split('T')[0],
        time: initialOrder.order?.order_time?.split('T')[1]?.split('.')[0]
    });

    useEffect(() => {
        instance({
            url: `photo/show/${order.order_id}`
        })
            .then(({data}) => setPhoto(data))
        instance({
            method: "get",
            url: `pay/order/${order.order_id}`
        }).then(({data}) => {
            setData(data)
        })
    }, [])
    const editOrder = useCallback((e) => {
        e.preventDefault()
        const body = {order}
        body.order.time = `${Number(body.order.time.split(':')[0])}:00`
        body.order.order_time = body.order.date + 'T' + body.order.time
        dispatch(updateOrder(body.order, order.order_id))
        inputRef.current.click()
    }, [order])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <button type="button" className="btn btn-info" data-toggle="modal"
                    data-target={order.isDone ? `#id_see${order.order_id}` : `#id_edit${order.order_id}`}>
                Посмотреть
            </button>

            <div className="modal fade" id={`id_edit${order.order_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={(e) => editOrder(e)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать заказ #{order.order_id}</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Выбрать мастера</label>
                                <select className="form-control" value={order.master_id} name="master_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать мастера---</option>
                                    {masters?.map(master =>
                                        <option key={master.master_id}
                                                value={master.master_id}>{master.master_name} </option>)}
                                    {loadNext &&
                                    <option value="-1" onClick={() => dispatch(setMasters(page))
                                    }>Загрузить еще...</option>
                                    }
                                </select>

                                <label>Имя покупателя</label>
                                <input className="form-control" value={order.customer.customer_name} name="customer_id"
                                       disabled>
                                </input>

                                <label>Город</label>
                                <select className="form-control" value={order.city_id} name="city_id"
                                        onChange={handleChange} required>
                                    <option value="-1" disabled={true}>---Выбрать город---</option>
                                    {cities?.map(city =>
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
                                       required pattern={datePattern}
                                       onChange={handleChange}/>
                                <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                                <input type="time" name="time" className="form-control timepicker"
                                       value={order.time}
                                       required step="3600"
                                       id="24h"
                                       onChange={handleChange}/>
                                <div className="form-group">
                                    {
                                        photo?.length > 0 &&
                                        photo.map((item, i) => {
                                            return (
                                                <div
                                                    className="d-flex align-items-start col-1 m-3"
                                                    key={i}>
                                                    <img
                                                        src={item}
                                                        alt="chosen"
                                                        style={{height: '150px', width: '150px'}}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {order.isPaid &&
                                <div className="form-group">
                                    <div className="modal-header">
                                        <h3 className="modal-title"
                                            id="exampleModalLabel">Детали оплаты заказа #{order.order_id}</h3>
                                    </div>
                                    <div className="modal-body">
                                        <p><b>id:</b> {data?.id}</p>
                                        <p><b>Время оплаты:</b> {data?.update_time.replace('T', ' ')}</p>
                                        <p>
                                            <b>Оплатил:</b> {data?.payer?.payer_info?.first_name} {data?.payer?.payer_info?.last_name}
                                        </p>
                                        <p><b>Email: </b>{data?.payer?.payer_info?.email}</p>
                                    </div>
                                </div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary" id="btnSave">
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
                            <h2 className="modal-title" id="exampleModalLabel">Просмотр заказа #{order.order_id}</h2>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Имя мастера</label>
                            <input className="form-control" value={order.master.master_name} name="master_id"
                                   disabled>
                            </input>
                            <label>Имя покупателя</label>
                            <input className="form-control" value={order.customer.customer_name} name="customer_id"
                                   disabled>
                            </input>
                            <label>Город</label>
                            <input className="form-control" value={order.city.city_name} name="city_id"
                                   disabled>
                            </input>
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
                                   disabled/>
                            <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                            <input type="time" name="time" className="form-control timepicker"
                                   value={order.time}
                                   disabled/>
                            <div className="form-group">
                                {
                                    photo?.length > 0 &&
                                    photo.map((item, i) => {
                                        return (
                                            <div
                                                className={`d-flex align-items-start col-1   m-3`}
                                                key={i}>
                                                <img
                                                    src={item}
                                                    alt="chosen"
                                                    style={{height: '150px', width: '150px'}}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {order.isPaid &&
                            <div className="form-group">
                                <div className="modal-header">
                                    <h3 className="modal-title"
                                        id="exampleModalLabel">Детали оплаты заказа #{order.order_id}</h3>
                                </div>
                                <div className="modal-body">
                                    <p><b>id:</b> {data?.id}</p>
                                    <p><b>Время оплаты:</b> {data?.update_time.replace('T', ' ')}</p>
                                    <p>
                                        <b>Оплатил:</b> {data?.payer?.payer_info?.first_name} {data?.payer?.payer_info?.last_name}
                                    </p>
                                    <p><b>Email: </b>{data?.payer?.payer_info?.email}</p>
                                </div>
                            </div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder;
