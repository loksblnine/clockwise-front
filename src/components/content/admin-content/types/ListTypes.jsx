import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {deleteType, setTypes} from "../../../../store/actions/typeActions";
import EditType from "./EditType";
import InputType from "./InputType";

const ListTypes = () => {
    const types = useSelector((state) => state.types.items)
    const isReady = useSelector((state) => state.types.isReady)
    const dispatch = useDispatch()

    useEffect(() => {
        if (types.length <= 0)
            dispatch(setTypes())
    }, [dispatch])

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h2 className="text-left mt-5">Список услуг</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название услуги</th>
                    <th scope="col">Длительность</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {types?.map(type => (
                    <tr key={type.work_id}>
                        <th scope="row"> {type.work_id}</th>
                        <td>{type.description}</td>
                        <td>{type.time}</td>
                        <td>{type.price} USD</td>
                        <td><EditType type={type}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => dispatch(deleteType(type.work_id))}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <InputType/>
        </div>
    )
}
export default ListTypes