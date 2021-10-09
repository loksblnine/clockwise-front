import React, {Fragment, useEffect, useContext, useState} from "react";
import EditCity from "./EditCity";
import InputCity from "./InputCity";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import axios from "axios";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";

const ListCities = observer(() => {
    const [loading, setLoading] = useState(true)
    const {DB} = useContext(Context)
    const deleteCity = async (id) => {
        try {
            await fetch(SERVER_URL + `/cities/${id}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(data => toast(data));
            axios.get(SERVER_URL + `/cities`)
                .then(resp => DB.setCities(resp.data))
        } catch (e) {
            toast.info("🦄 Ахахха сервер упал")
        }
    }

    useEffect(() => {
        axios.get(SERVER_URL + `/cities`)
            .then(resp => DB.setCities(resp.data))
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
            {" "}
            <h2 className="text-left mt-5">Список городов</h2>
            <table className="table mt-5 text-justify">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название города</th>
                    <th scope="col">Изменить</th>
                    <th scope="col">Удалить</th>
                </tr>
                </thead>

                <tbody>
                {DB.cities?.map(city => (
                    <tr key={city.city_id}>
                        <th scope="row"> {city.city_id}</th>
                        <td>{city.city_name}</td>
                        <td><EditCity city={city}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => deleteCity(city.city_id)}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            <InputCity/>
        </Fragment>
    )
})
export default ListCities