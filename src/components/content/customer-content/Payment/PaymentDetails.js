import React, {useEffect, useState} from 'react';
import {instance} from "../../../../http/headerPlaceholder.instance";

const PaymentDetails = ({order}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        instance({
            method: "get",
            url: `pay/order/${order.order_id}`
        }).then(({data}) => {
            setData(data)
        })
    }, [])
    return (
        <div>
            <button className="btn btn-outline-secondary" data-toggle="modal"
                    data-target={`#payment_id${order.order_id}`}
            >
                Детали оплаты
            </button>
            <div className="modal fade" id={`payment_id${order.order_id}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title"
                                id="exampleModalLabel">Детали оплаты заказа #{order.order_id}</h2>
                            <button type="button" className="close"
                                    data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><b>id:</b> {data?.id}</p>
                            <p><b>Время оплаты:</b> {Date(data?.update_time)}</p>
                            <p>
                                <b>Оплатил:</b> {data?.payer?.payer_info?.first_name} {data?.payer?.payer_info?.last_name}
                            </p>
                            <p><b>Email: </b>{data?.payer?.payer_info?.email}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal"
                            >Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
