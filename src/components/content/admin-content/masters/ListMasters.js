import React, {Fragment, useContext, useEffect, useState} from "react";
import EditMaster from "./EditMaster";
import InputMaster from "./InputMaster";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import AddCityDependency from "./AddCityDependency";
import {getDepsMasterIdCities} from "../../getData";

const WorkIn = observer(({master}) => {
    const {DB} = useContext(Context)
    const [masterId, setMasterId] = useState(master.master_id);
    const [deps, setDeps] = useState([])
    useEffect(() => {
        getDepsMasterIdCities(setDeps, masterId)
        axios.get(SERVER_URL + `/cities`)
            .then(resp => DB.setCities(resp.data))
    }, [DB])
    return (
        <ul>
            {DB.cities.map(c => {
                if(deps.find(d => d === c.city_id)){
                    return <li key={c.city_id}>{c.city_name}</li>
                }
            })}
        </ul>
    )
})

const ListMasters = observer(() => {
    const {DB} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const deleteMaster = async (id) => {
        try {
            await fetch(SERVER_URL + `/masters/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => toast(data));
            axios.get(SERVER_URL + `/masters`)
                .then(resp => DB.setMasters(resp.data))
        } catch (e) {
            toast("Ахахха сервер упал")
        }
    }

    useEffect(() => {
        axios.get(SERVER_URL + `/masters`)
            .then(resp => DB.setMasters(resp.data))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div>
                <Spinner animation={`grow`}/>
            </div>
        )
    }
    return (
        <Fragment>
            <h2 className="text-left mt-5">Список мастеров</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Рейтинг</th>
                    <th scope="col">Фото</th>
                    <th scope="col">Работает в</th>
                    <th scope="col">Добавить город</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    DB?.masters?.map(master => (
                        <tr key={master.master_id}>
                            <th scope="row"> {master.master_id}</th>
                            <td>{master.master_name}</td>
                            <td>{master.ranking}</td>
                            <td>{master.photo}</td>
                            <td><WorkIn master={master}/></td>
                            <td><AddCityDependency master={master}/></td>
                            <td><EditMaster master={master}/></td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteMaster(master.master_id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
            <InputMaster/>
        </Fragment>
    )
})
export default ListMasters