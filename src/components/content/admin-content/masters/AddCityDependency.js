import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";

const AddCityDependency = ({master}) => {
    const [masterId, setMasterId] = useState(master.master_id)
    const [cityId, setCityId] = useState("")
    const {DB} = useContext(Context);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {city_id: cityId, master_id: masterId}
            await fetch(SERVER_URL + `/deps`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => toast("Город добавлен "+master.master_name));
            axios.get(SERVER_URL + `/masters`)
                .then(resp => DB.setMasters(resp.data))
        } catch (e) {
            toast("Ахахха сервер упал")
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
                                <h2 className="modal-title" id="exampleModalLabel">Добавить город мастеру<br></br>
                                    {master.master_name}</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor={`name`}>Выберете город</label>
                                <select className="form-control" value={cityId} name={`city_id`} required
                                        onChange={e => setCityId(e.target.value)}>
                                    <option value={`-1`} disabled={true}>---Выбрать город---</option>
                                    {DB.cities?.map(city =>
                                        <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
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
export default AddCityDependency;