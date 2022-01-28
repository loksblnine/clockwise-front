import {ACTIONS} from "../../utils/constants";
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
            type: ACTIONS.CITIES.SET_CITIES,
            payload: data
        })
    }
}
export const setReadyCities = (bool: boolean) => (dispatch: any) => {
    dispatch({
        type: ACTIONS.CITIES.SET_READY_CITIES,
        payload: bool
    });
}

export const updateCity = (city: City, city_id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "put",
            data: city,
            url: `/cities/${city_id}`
        })
        dispatch({
            type: ACTIONS.CITIES.UPDATE_CITY,
            payload: data
        });
    }
}

export const addCity = (city: City) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: city,
            url: "/cities"
        })
        dispatch({
            type: ACTIONS.CITIES.ADD_CITY,
            payload: data
        });
    }
}

export const deleteCity = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            url: `/cities/${id}`
        })
        dispatch({
            type: ACTIONS.CITIES.DELETE_CITY,
            payload: id
        });
    }
}
