import * as constants from "../../constants";

export const setCities = (cities) => ({
    type: constants.ACTIONS.CITIES.SET_CITIES,
    payload: cities
});
