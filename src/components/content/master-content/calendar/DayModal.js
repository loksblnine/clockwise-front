import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;`

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f7f7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayModal = ({dayItem}) => {
    const todayOrders = useSelector((state) => state.orders.calendar).filter(o => dayjs(o.order_time.split('T')[0]).diff(dayItem, 'day') === 0)
    return (
        <div>
            <DayWrapper
                type="button"
                data-toggle="modal"
                data-target={`#id${dayItem.unix()}`}>
                <CurrentDay>{dayItem.format("D")}</CurrentDay>
            </DayWrapper>
            <div className="modal fade" id={`id${dayItem.unix()}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document" style={{minHeight: "50%"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title text-dark"
                                id="exampleModalLabel">Расписание {dayItem.toDate().toLocaleDateString()}</h3>
                            <button type="button" className="btn-close"
                                    data-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body text-dark">
                            {
                                todayOrders.length ?
                                    <div>
                                        {todayOrders.reverse()
                                            .map(o => (
                                                <div key={o.order_id}>
                                                    <li>{Number(o.order_time.split("T")[1].split(':')[0])+":00"}</li>
                                                    <button key={o.order_id} data-toggle="modal"
                                                            className={o.isDone ? "btn btn-success m-2" : "btn btn-danger m-2"}
                                                            data-target={`#id${o.order_id}`}>Заказ
                                                        №{o.order_id}</button>
                                                </div>))}
                                    </div>
                                    : "У вас нет заказов в этот день"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DayModal
