import React, {Fragment, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {stringPattern} from "../../../../utils/constants";
import {updateType} from "../../../../store/actions/typeActions";

const EditType = ({type}) => {
    const [description, setDescription] = useState(type.description)
    const [time, setTime] = useState(type.time)
    const [price, setPrice] = useState(type.price)

    const inputRef = React.useRef(null)
    const dispatch = useDispatch()

    const editType = useCallback((e) => {
        e.preventDefault()
        const body = {description, time, price}
        dispatch(updateType(body, type.work_id))
        inputRef.current.click()
    }, [dispatch, description, time, price])

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${type.work_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${type.work_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => editType(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать услугу</h2>
                                <button type="button" className="btn-close" data-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="description">Описание</label>
                                <input className="form-control" placeholder="Описание" value={description}
                                       name="description"
                                       required onChange={e => setDescription(e.target.value)}
                                       pattern={stringPattern}/>
                                <label htmlFor="time">Время работы</label>
                                <input className="form-control" value={time}
                                       name="time" type="time"
                                       required onChange={e => setTime(e.target.value)}
                                       />
                                <label htmlFor="price">Цена</label>
                                <input className="form-control" placeholder="Цена" value={price}
                                       name="price" required
                                       onChange={e => setPrice(e.target.value)}
                                       />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary"
                                >Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EditType;
