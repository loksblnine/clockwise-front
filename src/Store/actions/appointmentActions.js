import {apiGet, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS, calculateOffset, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";
import {toast} from "react-toastify";
import {checkAuth} from "./userActions";

export const getAppointmentsList = (page = 0, status) => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/notifications/all?statusIds=${status}&limit=${LIMIT_ITEM_PER_PAGE}&offset=${calculateOffset(page)}`
            });
            if (Number(status) === 3) {
                dispatch({
                    type: ACTIONS.APPOINTMENT.SET_PENDING_APPOINTMENTS,
                    payload: data
                });
            } else {
                dispatch({
                    type: ACTIONS.APPOINTMENT.SET_DONE_APPOINTMENTS,
                    payload: data
                });
            }
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(checkAuth());
            }
            toast.error("Something went wrong");
        }
    };
};

export const getUsersHavingPending = (name, page) => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/manager/clinic-patients?name=${name}&limit=${LIMIT_ITEM_PER_PAGE}&offset=${calculateOffset(page)}&hasPending=true`
            })
            dispatch({
                type: ACTIONS.APPOINTMENT.SET_USERS_HAVING_PENDING,
                payload: {data}
            })
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(checkAuth());
            }
            toast.error("Something went wrong");
        }
    };
};

export const getUserPendingAppointmentsList = (userId, setItems) => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/notifications/all?userId=${userId}&statusIds=3`
            });
            setItems(data)
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(checkAuth());
            }
            toast.error("Something went wrong");
        }
    };
};


export const editNotice = (type, id, notice, userId = null) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-notes`,
            data: {
                id,
                notice
            }
        })
            .then(() => {
                if (userId) {
                    dispatch({
                        type: ACTIONS.APPOINTMENT.UPDATE_REQUEST_NOTICE,
                        payload: {
                            id,
                            notice
                        }
                    });
                } else {
                    dispatch({
                        type: ACTIONS.APPOINTMENT.UPDATE_NOTICE,
                        payload: {
                            id,
                            notice
                        }
                    });
                }
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth());
                }
                toast.error("Something went wrong");
            });
    };
};

export const editTime = (type, id, newDate, userId = null) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-date`,
            data: {
                newDate
            }
        })
            .then(() => {
                if (userId) {
                    dispatch({
                        type: ACTIONS.APPOINTMENT.UPDATE_REQUEST_TIME,
                        payload: {
                            id,
                            date: newDate
                        }
                    });
                }
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};

export const editStatus = (type, id, statusId, userId = null) => {
    return async (dispatch) => {
        await apiPut({
            url: `/${type}/${id}/update-status`,
            data: {
                id,
                statusId
            }
        })
            .then(() => {
                if (userId) {
                    dispatch({
                        type: ACTIONS.APPOINTMENT.UPDATE_REQUEST_STATUS,
                        payload: {
                            id,
                            statusId
                        }
                    });
                } else {
                    dispatch({
                        type: ACTIONS.APPOINTMENT.REMOVE_FROM_LIST,
                        payload: id
                    });
                }
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth());
                }
                toast.error("Something went wrong");
            });
    };
};

export const getPatientInfo = (id) => {
    return async (dispatch) => {
        await apiGet({
            url: `/notifications/all?userId=${id}`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.APPOINTMENT.SET_PATIENT,
                    payload: data
                });
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth());
                }
                toast.error("Something went wrong");
            });
    };
};