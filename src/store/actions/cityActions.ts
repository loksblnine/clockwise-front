import * as constants from "../../constants";

export const setCities: object = (cities: any []) => ({
    type: constants.ACTIONS.CITIES.SET_CITIES,
    payload: cities
});

export const setReadyCities: object = (bool: boolean) => ({
    type: constants.ACTIONS.CITIES.SET_READY_CITIES,
    payload: bool
});

export const updateCity: object = (city: object) => ({
    type: constants.ACTIONS.CITIES.UPDATE_CITY,
    payload: city
});

export const addCity: object = (city: object) => ({
    type: constants.ACTIONS.CITIES.ADD_CITY,
    payload: city
});

export const deleteCity: object = (id: number) => ({
    type: constants.ACTIONS.CITIES.DELETE_CITY,
    payload: id
});
