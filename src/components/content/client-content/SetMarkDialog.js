import React, {useCallback, useState} from 'react';
import {setMarkOrder} from "../../../store/actions/orderActions";
import {useDispatch} from "react-redux";
import "./styles.css"
import {rankingPattern} from "../../../utils/constants";

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
                                <div className="range-slider">
                                    <input type="range" list="mark-list" id="rs-range-line"
                                           value={mark} min={1} max={5} step={1} className="rs-range"
                                           onChange={(e) => setMark(e.target.value)}
                                           pattern={rankingPattern}
                                           required
                                    />
                                    <datalist id="mark-list" className="d-flex justify-content-between">
                                        <option value={1} label="1" className="col-md-2"/>
                                        <option value={2} label="2" className="col-md-2"/>
                                        <option value={3} label="3" className="col-md-2"/>
                                        <option value={4} label="4" className="col-md-2"/>
                                        <option value={5} label="5" className="col-md-2"/>
                                    </datalist>
                                </div>
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
