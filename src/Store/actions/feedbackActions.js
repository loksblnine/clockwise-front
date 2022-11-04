import {toast} from "react-toastify";
import {apiGet, apiPost} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../Utils/constants";
import {checkAuth} from "./userActions";

export const getDoctorsFeedbackList = () => {
    return async (dispatch) => {
        await apiGet({
            url: `/doctor-feedbacks/all`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.FEEDBACK.SET_DOCTORS_FEEDBACK_LIST,
                    payload: data
                })
            })
            .catch((e) => {
                // if (e.response.status === 401) {
                //     dispatch(checkAuth())
                // }
                toast.error("Something went wrong");
            })
    }
}

export const getPatientsFeedbackList = () => {
    return async (dispatch) => {
        await apiGet({
            url: `/feedbacks/all`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.FEEDBACK.SET_PATIENTS_FEEDBACK_LIST,
                    payload: data
                })
            })
            .catch((e) => {
                // if (e.response.status === 401) {
                //     dispatch(checkAuth())
                // }
                toast.error("Something went wrong");
            })
    }
}

export const postFeedback = (userId, message, stars) => {
    return async (dispatch) => {
        await apiPost({
            url: `/feedbacks/`,
            data: {
                userId,
                message,
                stars
            }
        })
            .catch((e) => {
                // if (e.response.status === 401) {
                //     dispatch(checkAuth())
                // }
                toast.error("Something went wrong");
            })
    }
}