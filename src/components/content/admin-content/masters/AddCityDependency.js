import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {getAllDepsIntoStore} from "../../getData";
import {observer} from "mobx-react-lite";

const AddCityDependency = observer(({master}) => {
    const inputRef = React.useRef(null)
    const [cityId, setCityId] = useState("-1")
    const {DB} = useContext(Context);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {city_id: cityId, master_id: master.master_id}
            await fetch(SERVER_URL + `/deps`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }, body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(() => toast("Город добавлен " + master.master_name));
            axios.get(SERVER_URL + `/deps`)
                .then(resp => DB.setDepsMasterCity(resp.data))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <Fragment>
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
                                <h2 className="modal-title" id="exampleModalLabel">Добавить город мастеру<br></br>
                                    {master.master_name}</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label>Город</label>
                                <select className="form-control" name="city_id" defaultValue="-1"
                                        onBlur={e=>setCityId(e.target.value)}
                                        onChange={e => setCityId(e.target.value)} required>
                                    <option key="default" value="-1" disabled={true}>---Выбрать город---</option>
                                    {DB.cities?.filter(c => !DB.depsMasterCity.find(d => d.master_id === master.master_id && c.city_id === d.city_id)).map(city =>
                                        <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
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
        </Fragment>
    )
})
export default AddCityDependency;