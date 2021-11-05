import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";

const EditCity = ({city}) => {
    const {DB} = useContext(Context);
    const [city_name, setCityName] = useState(city.city_name)
    const inputRef = React.useRef(null)
    const updateCity = async (e) => {
        e.preventDefault()
        try {
            const body = {city_name}
            await fetch(SERVER_URL + `/cities/${city.city_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => toast(data));
            axios.get(SERVER_URL + `/cities`)
                .then(resp => DB.setCities(resp.data))
            inputRef.current.click()
        } catch (e) {
            toast.info("🦄 Ахахха сервер упал")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${city.city_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${city.city_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => updateCity(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать город</h2>
                                <button type="button" className="btn-close" data-dismiss="modal"
                                        aria-label="Close"/>
                            </div>

                            <div className="modal-body">
                                <label htmlFor={`city_name`}>Название города</label>
                                <input className="form-control" placeholder="Город" value={city_name}
                                       name={`city_name`}
                                       required onChange={e => setCityName(e.target.value)}
                                       pattern="[A-ZА-Яa-zа-я -]+"/>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputRef}>Закрыть
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
export default EditCity;