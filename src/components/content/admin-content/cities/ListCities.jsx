import React, {useEffect} from "react";
import EditCity from "./EditCity";
import InputCity from "./InputCity";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {deleteCity, setCities} from "../../../../store/actions/cityActions";

const ListCities = () => {
    const cities = useSelector((state) => state.cities.items)
    const {isReady} = useSelector((state) => state.cities)
    const dispatch = useDispatch()

    useEffect(() => {
        if (cities.length <= 0)
            dispatch(setCities())
    }, [dispatch])

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
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
                {cities?.map(city => (
                    <tr key={city.city_id}>
                        <th scope="row"> {city.city_id}</th>
                        <td>{city.city_name}</td>
                        <td><EditCity city={city}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => dispatch(deleteCity(city.city_id))}>Удалить
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