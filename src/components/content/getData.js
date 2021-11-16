import {SERVER_URL} from "../../constants";
import {toast} from "react-toastify";
import axios from "axios";

export const getDepsCityIdMasters = (setDeps, city_id) => {
    fetch(SERVER_URL + `/deps/city/` + city_id, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
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
    fetch(SERVER_URL + `/deps/master/` + master_id, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
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
export const getCitiesIntoStore = async (DB) => {
    axios.get(SERVER_URL + `/cities`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(resp => DB.setCities(resp.data))
}