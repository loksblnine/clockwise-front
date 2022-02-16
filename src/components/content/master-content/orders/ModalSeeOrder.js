import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {PDF_SVG, STAR} from "../../../../utils/svg_constants";
import {savePDFile} from "../../../../utils/utils";


const EditOrder = (initialOrder) => {
    const [data, setData] = useState(null)
    const types = useSelector((state) => state.types.items)
    const [photo, setPhoto] = useState([])

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
        if (order.isPaid) {
            instance({
                method: "get",
                url: `pay/order/${order.order_id}`
            }).then(({data}) => {
                setData(data)
            })
        }
    }, [])

    return (
        <div>
            <button type="button" className="btn btn-info" data-toggle="modal"
                    data-target={`#id_see${order.order_id}`}>
                Посмотреть
            </button>
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
                        <div className="modal-body form-group">
                            <label>Имя покупателя</label>
                            <input className="form-control" value={order.customer.customer_name} name="customer_id"
                                   disabled/>
                            <label>Город</label>
                            <input className="form-control" value={order.city.city_name} name="city_id"
                                   disabled/>
                            <label>Тип работы</label>
                            <input className="form-control"
                                   value={types.filter(t => Number(t.work_id) === Number(order.work_id))[0].description}
                                   name="city_id"
                                   disabled/>
                            <label className="text" htmlFor="date">Введите дату заказа </label>
                            <input type="date" name="date" value={order.date}
                                   className="form-control react-datetime-picker"
                                   disabled/>
                            <label className="text" htmlFor="timeFrom">Начало заказа</label>
                            <input type="time" name="timeFrom" className="form-control timepicker"
                                   value={order.time}
                                   disabled/>
                            <label className="text" htmlFor="timeTo">Время заказа (8:00 - 17:00) </label>
                            <input type="text" name="timeTo" className="form-control timepicker"
                                   value={Number(order?.order_time?.split('T')[1].split(':')[0]) + Number(order.work_id) + ":" + order.order_time.split('T')[1].split(':')[1]}
                                   disabled/>
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
                            {
                                order.isPaid &&
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
                                </div>
                            }
                            <div className="form-control mt-4" style={{cursor: "pointer"}}
                                 onClick={() =>
                                     savePDFile(order.order_id, localStorage.getItem('token'))}
                            >
                                Скачать чек &nbsp;{PDF_SVG}</div>
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
