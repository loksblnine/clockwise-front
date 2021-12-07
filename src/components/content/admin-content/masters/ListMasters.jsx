import React, {useEffect} from "react";
import EditMaster from "./EditMaster";
import InputMaster from "./InputMaster";
import {Spinner} from "react-bootstrap";
import AddCityDependency from "./AddCityDependency";
import {getCitiesIntoStore, getMastersIntoStore} from "../../getData";
import {useDispatch, useSelector} from "react-redux";
import {deleteCityAtMaster, deleteMaster} from "../../workWithData";

const WorkIn = ({master}) => {
    const {cities} = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {
    }, [dispatch])

    return (
        <div key={master.master_id}>
            {
                master?.deps?.map(d => {
                        return (
                            <div key={d}> {cities.items.find(city => city.city_id === d)?.city_name}
                                <button className="btn" onClick={() => deleteCityAtMaster(d, master.master_id, dispatch)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                        )
                    }
                )}
        </div>
    )
}
const ListMasters = () => {
    const masters = useSelector((state) => state.masters.items)
    const cities = useSelector((state) => state.cities.items)
    const {isReady, loadNext, page} = useSelector((state) => state.masters)
    const dispatch = useDispatch()

    useEffect(() => {
        if (masters.length <= 0) {
            getMastersIntoStore(dispatch, page)
        }
        if (cities.length <= 0) {
            getCitiesIntoStore(dispatch)
        }
    }, [dispatch, cities.length, masters.length, page])

    const handleNextMasters = (e) => {
        e.target.disabled = true
        getMastersIntoStore(dispatch, page)
            .then(() =>
                e.target.disabled = false)
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Список мастеров</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Рейтинг</th>
                    <th scope="col">Email</th>
                    <th scope="col">Работает в</th>
                    <th scope="col">Добавить город</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    masters?.map(master => (
                        <tr key={master.master_id}>
                            <th scope="row"> {master.master_id}</th>
                            <td>{master.master_name}</td>
                            <td>{master.ranking}</td>
                            <td>{master.email}</td>
                            <td><WorkIn master={master}/></td>
                            <td>{
                                cities?.length !== master?.deps?.length &&
                                <AddCityDependency master={master}/>}
                            </td>
                            <td><EditMaster master={master}/></td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => deleteMaster(master.master_id, dispatch)}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {
                loadNext &&
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={(e) => handleNextMasters(e)}> Еще мастера...</button>
                </div>
            }
            <InputMaster/>
        </div>
    )
}
export default ListMasters