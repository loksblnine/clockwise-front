import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {addCity} from "../../../../store/actions/cityActions";
import {stringPattern} from "../../../../utils/constants";

const InputCity = () => {
    const [city_name, setCityName] = useState("")

    const dispatch = useDispatch()
    const inputRef = React.useRef(null)

    const onSubmitForm = useCallback((e) => {
        e.preventDefault()
        const body = {city_name}
        dispatch(addCity(body))
        inputRef.current.click()
    }, [dispatch, city_name])
    return (
        <div>
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
                                <label htmlFor="name">Название города</label>
                                <input className="form-control" placeholder="Город" value={city_name} name={`name`}
                                       onChange={e => setCityName(e.target.value)} required
                                       pattern={stringPattern}/>
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

export default InputCity;
