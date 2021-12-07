import * as constants from "../../constants";
import {instance} from "../../http/headerPlaceholder.instance";

type City = {
    city_id: number,
    city_name: string
}

export const setCities = () => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: "/cities"
        })
        dispatch({
            type: constants.ACTIONS.CITIES.SET_CITIES,
            payload: data
        })
    }
}
export const setReadyCities = (bool: boolean) => ({
    type: constants.ACTIONS.CITIES.SET_READY_CITIES,
    payload: bool
});

export const updateCity = (city: City) => ({
    type: constants.ACTIONS.CITIES.UPDATE_CITY,
    payload: city
});

export const addCity = (city: City) => ({
    type: constants.ACTIONS.CITIES.ADD_CITY,
    payload: city
});

export const deleteCity = (id: number) => ({
    type: constants.ACTIONS.CITIES.DELETE_CITY,
    payload: id
});
