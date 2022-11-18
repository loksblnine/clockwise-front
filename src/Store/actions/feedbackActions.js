import {toast} from "react-toastify";
import {apiGet, apiPost} from "../../http/headerPlaceholder.instance";
import {ACTIONS, calculateOffset, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";
import {checkAuth} from "./userActions";

export const getFeedbackList = (type, order = "ASC", value = '', page = 0) => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/${type}/all?text=${value}&order=${order}&limit=${LIMIT_ITEM_PER_PAGE}&offset=${calculateOffset(page)}`
            });
            if (value) {
                dispatch({
                    type: ACTIONS.FEEDBACK.SET_FILTERED_ARRAY,
                    payload: data
                });
            } else {
                dispatch({
                    type: ACTIONS.FEEDBACK.SET_FEEDBACKS,
                    payload: data
                });
            }
        } catch (e) {
            // toast.error("Something went wrong");
        }
    };
};

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