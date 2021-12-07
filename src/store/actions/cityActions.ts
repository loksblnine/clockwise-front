import * as constants from "../../constants";

type City = {
    city_id: number,
    city_name: string
}

export const setCities = (cities: any []) => ({
    type: constants.ACTIONS.CITIES.SET_CITIES,
    payload: cities
});

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
