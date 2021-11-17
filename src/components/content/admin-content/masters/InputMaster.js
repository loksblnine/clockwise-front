import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";
import {getMastersIntoStore} from "../../getData";

const InputMaster = () => {
    const [master_name, setMasterName] = useState("")
    const [ranking, setRanking] = useState("")

    const {DB} = useContext(Context);
    const inputRef = React.useRef(null)
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {master_name, ranking}
            await fetch(SERVER_URL + `/masters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }, body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(() => toast(`Мастер ${master_name} добавлен`));
            await getMastersIntoStore(DB)
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target="#addMaster">
                Добавить
            </button>
            <div className="modal fade" id="addMaster" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Добавить мастера</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor={`name`}>ФИО мастера</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={master_name}
                                       name={`name`} onChange={e => setMasterName(e.target.value)}
                                       required pattern="[A-ZА-Яa-zа-я -]+"
                                />
                                <label htmlFor={`rating`}>Рейтинг</label>
                                <input className="form-control" placeholder="5.0" value={ranking} name={`ranking`}
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
export default InputMaster;