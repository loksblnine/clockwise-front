import React, {Fragment, useState} from "react";
import {toast} from "react-toastify";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {useStore} from "react-redux";
import * as constants from "../../../../constants";

const InputCity = () => {
    const [city_name, setCityName] = useState("")
    const store = useStore()
    const inputRef = React.useRef(null)
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {city_name}
            instance({
                method: "POST",
                data: body,
                url: "/cities"
            })
                .then(() => toast("Город добавлен"))
                .then(({data}) => store.dispatch({
                    type: constants.ACTIONS.CITIES.ADD_CITY,
                    payload: data
                }))
                .catch(() => toast.error("Город не добавлен"))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
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
                                       pattern="[A-ZА-Яa-zа-я -]+"/>
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

export default InputCity;