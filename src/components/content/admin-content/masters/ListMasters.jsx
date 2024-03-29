import React, {useCallback, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import EditMaster from "./EditMaster";
import InputMaster from "./InputMaster";
import AddCity from "./AddCity";
import {activeMaster, deleteCityAtMaster, deleteMaster, setMasters} from "../../../../store/actions/masterActions";
import {setCities} from "../../../../store/actions/cityActions";

const WorkIn = ({master}) => {
    const cities = useSelector((state) => state.cities.items)
    const dispatch = useDispatch()

    return (
        <div key={master.master_id}>
            {
                master?.deps?.map(d => {
                        return (
                            <div key={d}> {cities.find(city => city.city_id === d)?.city_name}
                                <button className="btn"
                                        onClick={() => dispatch(deleteCityAtMaster({
                                            city_id: d,
                                            master_id: master.master_id
                                        }))}>
                                    <span>&times;</span>
                                </button>
                            </div>
                        )
                    }
                )}
            {master?.deps?.length !== cities.length &&
            <AddCity master={master}/>}
        </div>
    )
}
const ListMasters = () => {
    const masters = useSelector((state) => state.masters.items)
    const cities = useSelector((state) => state.cities.items)
    const {isReady, loadNext, page} = useSelector((state) => state.masters)
    const dispatch = useDispatch()

    useEffect(() => {
        if (cities.length <= 0)
            dispatch(setCities())
        if (masters.length <= 0)
            dispatch(setMasters(page))
    }, [dispatch])

    const handleNextMasters = useCallback((e) => {
        e.target.disabled = true
        dispatch(setMasters(page))
        e.target.disabled = false
    }, [page])

    const handleApproveMaster = (master, active) => {
        dispatch(activeMaster(master.master_id, active))
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h2 className="text-left mt-5">Список мастеров</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Рейтинг</th>
                    <th scope="col">Email</th>
                    <th scope="col">Работает в</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Статус</th>
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
                            <td><EditMaster master={master}/></td>
                            <td>{
                                !master.isApproved ?
                                    <button className="btn btn-outline-success"
                                            onClick={() => handleApproveMaster(master, true)}>
                                        Активировать
                                    </button>
                                    :
                                    <div>
                                        <button className="btn btn-outline-danger" type="button"
                                                data-toggle="modal" data-target={`#id_approve${master.master_id}`}
                                        >
                                            Деактивировать
                                        </button>
                                        <div className="modal fade" id={`id_approve${master.master_id}`} tabIndex="-1"
                                             role="dialog"
                                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <form>
                                                        <div className="modal-header">
                                                            <h3 className="modal-title"
                                                                id="exampleModalLabel">Деактивировать мастера?</h3>
                                                            <button type="button" className="btn-close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"/>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-danger"
                                                                    data-dismiss="modal"
                                                            >Нет, отмена
                                                            </button>
                                                            <button type="button" className="btn btn-success"
                                                                    data-dismiss="modal"
                                                                    onClick={() => handleApproveMaster(master, false)}
                                                            >Да!
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}</td>
                            <td>
                                <button className="btn btn-danger"
                                        onClick={() => dispatch(deleteMaster(master.master_id))}>Удалить
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
