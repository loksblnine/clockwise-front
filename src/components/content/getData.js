import {SERVER_URL} from "../../constants";
import {toast} from "react-toastify";

export const getDepsCityIdMasters = (setDeps, city_id) => {
    fetch(SERVER_URL + `/deps/city/` + city_id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setDeps(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}

export const getDepsMasterIdCities = (setDeps, master_id) => {
    fetch(SERVER_URL + `/deps/master/` + master_id)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setDeps(data)
        })
        .catch((e) => {
            toast.error("🦄 Сервер решил полежать)")
        })
}