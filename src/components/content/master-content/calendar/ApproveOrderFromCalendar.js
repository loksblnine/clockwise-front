import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import {approveOrder} from "../../../../store/actions/masterActions";

const EventItemWrapper = styled('button')`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border: unset;
  background: unset;
  background: ${props => props.isDone && 'rgba(13,128,9,0.4)'};
  color: ${props => props.isDone ? '#0d8009' : '#a38808'};
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ApproveOrderFromCalendar = ({order}) => {
    const types = useSelector((state) => state.types.items)
    const dispatch = useDispatch()

    const handleApproveOrder = (order) => {
        dispatch(approveOrder(order.order_id))
    }
    return (
        <li key={order.id}>
            {order.order_time.split('T')[1].split(".")[0]}
            <EventItemWrapper type="button" isDone={order.isDone}
                              data-toggle="modal"
                              data-target={`#id${order.order_id}`}>
                Заказ №{order.order_id}
            </EventItemWrapper>
            <div className="modal fade" id={`id${order.order_id}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title text-dark"
                                id="exampleModalLabel">Заказ #{order.order_id}</h3>
                            <button type="button" className="btn-close"
                                    data-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body text-dark">
                            <div>
                                <label htmlFor="name">Имя покупателя</label>
                                <input className="form-control" id="name" disabled value={order.customer.customer_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="type">Тип работы</label>
                                <input className="form-control" disabled
                                       value={types.filter(t => Number(t.work_id) === Number(order?.work_id))[0].description}
                                />
                            </div>
                            <div>
                                <label htmlFor="city">Город</label>
                                <input className="form-control" disabled
                                       value={order.city.city_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Стоимость</label>
                                <input className="form-control" disabled
                                       value={types.find(t => Number(t.work_id) === Number(order.work_id))?.price + " USD"}
                                />
                            </div>
                            <div>
                                <label htmlFor="status">Статус</label></div>
                            {order.isDone ? <span className="text-success">Выполнен</span> :
                                <div>
                                    <p> Подтвердить выполнение?</p>
                                    <button type="button" className="btn btn-danger m-2"
                                            data-dismiss="modal"
                                    >Нет, отмена
                                    </button>
                                    <button type="button" className="btn btn-success m-2"
                                            data-dismiss="modal"
                                            onClick={() => handleApproveOrder(order)}
                                    >Да!
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default ApproveOrderFromCalendar
