import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";

const InputCity = () => {
    const [city_name, setCityName] = useState("")
    const {DB} = useContext(Context);
    const inputRef = React.useRef(null)
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
                .then(data => toast("Город добавлен"));
            axios.get(SERVER_URL + `/cities`)
                .then(resp => DB.setCities(resp.data))
            inputRef.current.click()
        } catch (e) {
            toast.info("🦄 Ахахха сервер упал")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target="#addTown">
                Добавить
            </button>

            <div className="modal fade" id="addTown" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Добавить город</h1>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor={`name`}>Название города</label>
                                <input className="form-control" placeholder="Город" value={city_name} name={`name`}
                                       onChange={e => setCityName(e.target.value)} required
                                       pattern="/^[A-ZА-Яa-zа-я -]+$/i"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputRef}>Закрыть
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

export default InputCity;