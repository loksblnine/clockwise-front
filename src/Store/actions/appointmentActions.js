import {apiDelete, apiGet, apiPost, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS, calculateOffset, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";
import {toast} from "react-toastify";
import {checkAuth} from "./userActions";

export const getAppointmentsList = (value = '', page = 0, status) => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/notifications/all?statusIds=${status}&limit=${LIMIT_ITEM_PER_PAGE}&offset=${calculateOffset(page)}`
            });
            if (value.length) {
                dispatch({
                    type: ACTIONS.APPOINTMENT.SET_FILTERED_ARRAY,
                    payload: data
                });
            } else {
                dispatch({
                    type: ACTIONS.APPOINTMENT.SET_APPOINTMENTS,
                    payload: data
                });
            }
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(checkAuth())
            }
            toast.error("Something went wrong");
        }
    }
}

export const editNotice = (type, id, notice) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-notes`,
            data: {
                id,
                notice
            }
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY
                })
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                }
                toast.error("Something went wrong");
            })
    }
}

export const editTime = (type, id, newDate) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-date`,
            data: {
                newDate
            }
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY
                })
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                }
                toast.error("Something went wrong");
            })
    }
}

export const editStatus = (type, id, statusId) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-status`,
            data: {
                id,
                statusId
            }
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY
                })
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                }
                toast.error("Something went wrong");
            })
    }
}