import React, {Fragment, useContext, useEffect, useState} from "react";
import EditMaster from "./EditMaster";
import InputMaster from "./InputMaster";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import AddCityDependency from "./AddCityDependency";
import {getAllDepsIntoStore, getCitiesIntoStore, getMastersIntoStore} from "../../getData";
import {instance} from "../../../../http/headerPlaceholder.instance";

const WorkIn = observer(({master}) => {
    const {DB} = useContext(Context)
    const deleteCity = async (city_id, master_id) => {
        const body = {city_id, master_id}
        try {
            await fetch(SERVER_URL + `/deps`, {
                method: "DELETE",
                headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }, body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => toast(data));
            await getAllDepsIntoStore(DB)
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <div>
            {DB.cities?.map(c => {
                if (DB.depsMasterCity?.find(d => (d.city_id === c.city_id && d.master_id === master.master_id))) {
                    return (
                        <div key={c.city_id}>
                            {c.city_name}
                            <button className="btn" onClick={() => deleteCity(c.city_id, master.master_id)}>
                                <span>&times;</span>
                            </button>
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
})

const ListMasters = observer(() => {
    const {DB} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const deleteMaster = async (id) => {
        try {
            instance({
                method: "DELETE",
                url: `/masters/${id}`
            })
                .then(resp => toast(resp.data))
                .then(() =>
                    getMastersIntoStore(DB)
                )
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    useEffect(async () => {
        if (DB.cities?.length <= 0)
            await getCitiesIntoStore(DB)
        if (DB.depsMasterCity?.length <= 0)
            await getAllDepsIntoStore(DB)
        getMastersIntoStore(DB)
            .finally(() => setLoading(false))
    }, [DB])

    if (loading) {
        return (
            <div>
                <Spinner animation={`grow`}/>
            </div>
        )
    }
    const handleNextMasters = () => {
        DB?.setMasters(DB.masters.concat(DB.mastersNext))
        sessionStorage.setItem('pageMasterList', (Number(sessionStorage.getItem('pageMasterList')) + 1).toString())
        instance({
            method: "get",
            url: `/masters/offset/${sessionStorage.getItem('pageMasterList')}`
        })
            .then(resp => DB.setMastersNext(resp.data))
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
                            <td>{
                                DB.cities?.length > DB.depsMasterCity?.filter(d => d.master_id === master.master_id).length &&
                                <AddCityDependency master={master}/>}</td>
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
            {
                DB.mastersNext.length >= 1 ?
                    <div className="col text-center">
                        <button className="btn btn-primary" onClick={() => handleNextMasters()}> Еще мастера...</button>
                    </div>
                    : null
            }
            <InputMaster/>
        </Fragment>
    )
})
export default ListMasters