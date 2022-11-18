import {apiDelete, apiGet, apiPost, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../Utils/constants";
import {toast} from "react-toastify";
import {checkAuth} from "./userActions";
import Moment from "moment/moment";
import {addDoctorSpecialty, removeDoctorSpecialty} from "./doctorActions";

export const getManagersList = () => {
    return async (dispatch) => {
        try {
            const {data} = await apiGet({
                url: `/manager/all`
            });
            dispatch({
                type: ACTIONS.ADMIN.SET_MANAGERS,
                payload: data
            });
        } catch (e) {
            toast.error("Something went wrong");
        }
    };
};

export const getManagerById = (id) => {
    return async (dispatch) => {
        await apiGet({
            url: `/manager/all?managerId=${id}`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.ADMIN.SET_MANAGER,
                    payload: {...data[0].user, clinic_id: data[0].clinic_id}
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

export const updateManagerPhoto = (userId, data) => {
    return async (dispatch) => {
        await apiPut({
            url: "/manager/update-photo",
            data: {
                userId,
                data
            }
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.ADMIN.ADD_MANAGER_PHOTO,
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

export const deleteUser = (userId, navigate) => {
    return async (dispatch) => {
        await apiDelete({
            url: `/users/${userId}`
        }).then(() => {
            dispatch(getManagersList())
            navigate('/')
        })
    }
}

export const editManagerInfo = (values, userId) => {
    const {
        first_name,
        last_name,
        birthDate,
        location,
        telephone,
    } = values;
    const date = Moment(birthDate, "DD/MM/YYYY").toDate();

    return async (dispatch) => {
        await apiPut({
            url: `users/update-by-manager`,
            data: {
                userId,
                birthDate: Moment(date).format("MM/DD/YYYY"),
                firstName: first_name,
                lastName: last_name,
                location,
                telephone
            }
        })
            // .then(() => {
            //     if (Number(clinic_id) !== Number(prevClinicId)) {
            //         dispatch(addDoctorSpecialty(userId, Number(secondarySpecialty), false));
            //     }
            // })
            .then(async () => {
                toast.success("Updated!")
                dispatch(getManagerById(userId))
            })
            .catch((e) => {
                dispatch({
                    type: ACTIONS.MESSAGE.SET_ERROR,
                    payload: "Something went wrong"
                });
                toast.error("Something went wrong");
            });
    };
};

export const registerManager = (data) => {
    return async (dispatch) => {
        await apiPost({
            url: "/manager/register-manager",
            data
        })
            .then(() => {
                dispatch({
                    type: ACTIONS.MESSAGE.SET_MESSAGE,
                    payload: "Success!"
                });
                dispatch(getManagersList())
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};
