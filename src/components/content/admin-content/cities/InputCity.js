import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const InputCity = () => {
    const [city_name, setCityName] = useState("")
    const history = useHistory()

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {city_name}
            await fetch(SERVER_URL + `/cities`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => console.log(data));
            history.go(0)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal"
                    data-target="#addTown">
                Добавить
            </button>

            <div className="modal fade" id="addTown" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Добавить город</h1>
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor={`name`}>Название города</label>
                            <input className="form-control" placeholder="Город" value={city_name} name={`name`}
                                   onChange={e => setCityName(e.target.value)} required/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
                            </button>
                            <button type="submit" className="btn btn-primary"
                                    onClick={e => onSubmitForm(e)}>Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default InputCity;