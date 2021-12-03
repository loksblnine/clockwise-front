import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {useDispatch, useSelector} from "react-redux";
import {addCityAtMaster} from "../../workWithData";

const AddCityDependency = observer(({master}) => {
    const inputRef = React.useRef(null)
    const [cityId, setCityId] = useState(-1)
    const cities = useSelector((state) => state.cities.items)
    const dispatch = useDispatch()
    const onSubmitForm = async e => {
        e.preventDefault();
        const body = {city_id: cityId, master_id: master.master_id}
        addCityAtMaster(body, dispatch)
            .then(() => inputRef.current.click())
    }

    //TODO citiesToCheck
    return (
        <div>
            <button type="button" className="btn btn-outline-success mb-5" data-toggle="modal"
                    data-target={`#id_see${master.master_id}`}>
                Добавить
            </button>
            <div className="modal fade" id={`id_see${master.master_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Добавить город мастеру<br/>
                                    {master.master_name}</h2>
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
                                        return (
                                            <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)
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
})
export default AddCityDependency;