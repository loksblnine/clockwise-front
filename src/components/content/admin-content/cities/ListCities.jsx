import React, {useEffect} from "react";
import EditCity from "./EditCity";
import InputCity from "./InputCity";
import {toast} from "react-toastify";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesIntoStore} from "../../getData";
import * as constants from "../../../../constants";

const ListCities = () => {
    const cities = useSelector((state) => state.cities)
    const dispatch = useDispatch()
    const deleteCity = async (id) => {
        try {
            instance({
                method: "DELETE",
                url: `/cities/${id}`
            })
                .then(async () => {
                        dispatch({
                            type: constants.ACTIONS.CITIES.DELETE_CITY,
                            payload: id
                        })
                    }
                )
                .then(() => toast("Город удален"))
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }

    useEffect(() => async () => {
        if (!cities.items.length) {
            await getCitiesIntoStore(dispatch)
        }
    }, [dispatch])

    return (
        <div className="router">
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
                {cities.items?.map(city => (
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
        </div>
    )
}
export default ListCities