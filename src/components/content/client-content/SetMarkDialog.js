import React, {useCallback, useState} from 'react';
import {setMarkOrder} from "../../../store/actions/orderActions";
import {useDispatch} from "react-redux";

const SetMarkDialog = ({order}) => {
    const dispatch = useDispatch()
    const inputRef = React.useRef(null)
    const [mark, setMark] = useState(5)

    const handleSetMarkOrder = useCallback((e, order) => {
        e.preventDefault()
        inputRef.current.click()
        dispatch(setMarkOrder(order.order_id, mark))
    }, [dispatch, mark])
    return (
        <div>
            <button className="btn btn-outline-success" data-toggle="modal"
                    data-target={`#id${order.order_id}`}
            >
                Поставить оценку!
            </button>
            <div className="modal fade" id={`id${order.order_id}`} tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={(e) => handleSetMarkOrder(e, order)}>
                            <div className="modal-header">
                                <h2 className="modal-title"
                                    id="exampleModalLabel">Поставить оценку
                                    мастеру {order.master.master_name}</h2>
                                <button type="button" className="close"
                                        data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name">ФИО мастера</label>
                                <input className="form-control"
                                       placeholder="Иван Иванович Иванов"
                                       value={mark}
                                       name="name"
                                       onChange={(e) => setMark(e.target.value)}
                                       pattern="([1-5])|([1-4].[05])|(5.0)"
                                       required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}

export default SetMarkDialog;