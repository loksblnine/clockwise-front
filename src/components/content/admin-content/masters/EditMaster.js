import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {getMastersIntoStore} from "../../getData";
import axios from "axios";
import {instance} from "../../../../http/headerPlaceholder.instance";

const EditMaster = ({master}) => {
    const [master_name, setMasterName] = useState(master.master_name)
    const [ranking, setRanking] = useState(master.ranking)
    const {DB} = useContext(Context);
    const inputRef = React.useRef(null)
    const updateMaster = async (e) => {
        e.preventDefault()
        try {
            const body = {master_name, ranking}
            instance({
                method: "PUT",
                data: body,
                url: `/masters/${master.master_id}`
            })
                .then((resp) => toast(resp.data))
                .then(() => getMastersIntoStore(DB))
                .catch(() => toast.error("Данные не обновлены"))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${master.master_id}`}>
                Редактировать
            </button>
            <div className="modal fade" id={`id${master.master_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => updateMaster(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать мастера</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor={`name`}>ФИО мастера</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={master_name}
                                       name={`name`} onChange={e => setMasterName(e.target.value)}
                                       pattern="[A-ZА-Яa-zа-я -]+"
                                       required
                                />
                                <label htmlFor={`rating`}>Рейтинг</label>
                                <input className="form-control" placeholder="5.0" value={ranking} name={`rating`}
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
        </Fragment>
    )
}

export default EditMaster;