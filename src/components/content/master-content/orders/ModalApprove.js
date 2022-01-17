import {useDispatch} from "react-redux";
import {approveOrder} from "../../../../store/actions/masterActions";
import React from "react";

const ModalApprove = ({order}) => {
    const dispatch = useDispatch()
    const handleApproveOrder = (order) => {
        dispatch(approveOrder(order.order_id))
    }
    return (
        <div>
            <button type="button" className="btn btn-outline-success"
                    data-toggle="modal"
                    data-target={`#id${order.order_id}`}>
                Заказ выполнен!
            </button>
            <div className="modal fade" id={`id${order.order_id}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h3 className="modal-title"
                                    id="exampleModalLabel">Подтвердить выполнение
                                    заказа?</h3>
                                <button type="button" className="btn-close"
                                        data-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger"
                                        data-dismiss="modal"
                                >Нет, отмена
                                </button>
                                <button type="button" className="btn btn-success"
                                        data-dismiss="modal"
                                        onClick={() => handleApproveOrder(order)}
                                >Да!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalApprove