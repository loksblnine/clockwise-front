import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {updateMaster} from "../../../../store/actions/masterActions";

const EditMaster = ({master}) => {
    const [master_name, setMasterName] = useState(master.master_name)
    const [master_email, setMasterEmail] = useState(master.email)
    const [ranking, setRanking] = useState(master.ranking)
    const dispatch = useDispatch()
    const inputRef = React.useRef(null)

    const editMaster = useCallback((e) => {
        e.preventDefault()
        const body = {master_name, email: master_email, ranking}
        dispatch(updateMaster(body, master.master_id))
        inputRef.current.click()
    }, [master_name, master_email, ranking])
    return (
        <div>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${master.master_id}`}>
                Редактировать
            </button>
            <div className="modal fade" id={`id${master.master_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => editMaster(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать мастера</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name">ФИО мастера</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={master_name}
                                       name="name" onChange={e => setMasterName(e.target.value)}
                                       pattern="[A-ZА-Яa-zа-я -]+"
                                       required
                                />
                                <label htmlFor="email">e-mail</label>
                                <input className="form-control" value={master_email} name="email" type="email"
                                       onChange={e => setMasterEmail(e.target.value)}
                                       required
                                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+"
                                />
                                <label htmlFor="rating">Рейтинг</label>
                                <input className="form-control" placeholder="5.0" value={ranking} name="rating"
                                       onChange={e => setRanking(e.target.value)}
                                       required pattern="([1-5])|([1-4].[05])|(5.0)"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
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
        </div>
    )
}

export default EditMaster;