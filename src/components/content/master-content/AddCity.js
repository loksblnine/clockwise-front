import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMasterNewCity} from "../../../store/actions/userActions";
import {Spinner} from "react-bootstrap";

const AddCity = ({master}) => {
    const inputRef = React.useRef(null)
    const [cityId, setCityId] = useState(-1)
    const cities = useSelector((state) => state.cities.items)
    const isReady = useSelector((state) => state.cities.isReady)
    const deps = useSelector((state) => state.users.data.deps)
    const dispatch = useDispatch()
    const onSubmitForm = async e => {
        e.preventDefault();
        const body = {city_id: cityId, master_id: master.master_id}
        dispatch(setMasterNewCity(body))
        inputRef.current.click()
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target={`#id_see`}>
                Добавить
            </button>
            <div className="modal fade" id={`id_see`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Добавить город</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Город</label>
                                <select className="form-control" name="city_id" defaultValue="-1"
                                        onBlur={e => setCityId(e.target.value)}
                                        onChange={e => setCityId(e.target.value)} required>
                                    <option key="default" value="-1" disabled={true}>---Выбрать город---</option>
                                    {cities?.map(city => {
                                        if (!deps?.includes(city.city_id))
                                            return (
                                                <option key={city.city_id}
                                                        value={city.city_id}>{city.city_name} </option>)
                                    })}
                                </select>
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
export default AddCity