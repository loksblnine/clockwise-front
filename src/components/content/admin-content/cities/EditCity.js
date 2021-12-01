import React, {Fragment, useState} from "react";
import {toast} from "react-toastify";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {useStore} from "react-redux";
import * as constants from "../../../../constants";

const EditCity = ({city}) => {
    const store = useStore()
    const [city_name, setCityName] = useState(city.city_name)
    const inputRef = React.useRef(null)
    const updateCity = async (e) => {
        e.preventDefault()
        try {
            const body = {city_name}
            instance({
                method: "PUT",
                data: body,
                url: `/cities/${city.city_id}`
            })
                .then(() => toast("Изменения сохранены"))
                .then(({data}) => store.dispatch({
                    type: constants.ACTIONS.CITIES.UPDATE_CITY,
                    payload: data
                }))
                .catch(() => toast.error("Данные не обновлены"))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
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
                                       name="city_name"
                                       required onChange={e => setCityName(e.target.value)}
                                       pattern="[A-ZА-Яa-zа-я -]+"/>
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
export default EditCity;