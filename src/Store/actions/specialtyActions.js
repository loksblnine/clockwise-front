import {toast} from "react-toastify";
import {apiGet} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../Utils/constants";

export const getSpecialtiesList = () => {
    return async (dispatch) => {
        await apiGet({
            url: `/specialties/all`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.SPECIALTiES.SET_SPECIALTiES,
                    payload: data
                })
            })
            .catch(() => {
                toast("Something went wrong");
            })
    }
}