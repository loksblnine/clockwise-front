import React, {Fragment, useEffect, useState} from "react";
import EditMaster from "./EditMaster";
import InputMaster from "./InputMaster";
import {SERVER_URL} from "../../../../constants";
import {getMasters} from "../../getData";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";

const ListMasters = () => {
    const [masters, setMasters] = useState([]);
    const [loading, setLoading] = useState(true)
    const deleteMaster = async (id) => {
        try {
            await fetch(SERVER_URL + `/masters/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => console.log(data));
            await getMasters(setMasters)
        } catch (e) {
            toast("Ахахха сервер упал")
        }
    }

    useEffect(() => {
        getMasters(setMasters)
        setLoading(false)
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <Fragment>
            {" "}
            <h2 className="text-left mt-5">Список мастеров</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Рейтинг</th>
                    <th scope="col">Фото</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {masters.map(master => (
                    <tr key={master.master_id}>
                        <th scope="row"> {master.master_id}</th>
                        <td>{master.master_name}</td>
                        <td>{master.ranking}</td>
                        <td>{master.photo}</td>
                        <td><EditMaster master={master}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => deleteMaster(master.master_id)}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <InputMaster/>
        </Fragment>
    )
}
export default ListMasters