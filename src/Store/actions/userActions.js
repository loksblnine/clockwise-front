import {toast} from "react-toastify";
import {apiGet, apiPost, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../Utils/constants";
import {addDoctorSpecialty, removeDoctorSpecialty} from "./doctorActions";
import Moment from "moment";

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        await apiPost({
            url: "/auth/log-in",
            data: {email, password}
        }).then(({data}) => {
            const rememberMe = localStorage.getItem("rememberMe") === "true"
            if (rememberMe) {
                dispatch({
                    type: ACTIONS.USER.SET_TOKENS,
                    payload: data
                });
            } else {
                delete data.refreshToken
                dispatch({
                    type: ACTIONS.USER.SET_TOKENS,
                    payload: data
                });
            }
        }).then(() => {
            navigate("/");
        }).catch(() => {
            toast.error("Invalid email or password");
        });
    };
};

export const checkAuth = () => {
    return async (dispatch) => {
        const refreshToken = localStorage.getItem('refreshToken')
        await apiPut({
            url: "/auth/log-in",
            data: {refreshToken}
        })
            .then(({data}) => {
                const rememberMe = localStorage.getItem("rememberMe") === "true"
                if (rememberMe) {
                    dispatch({
                        type: ACTIONS.USER.SET_TOKENS,
                        payload: data
                    });
                } else {
                    delete data.refreshToken
                    dispatch({
                        type: ACTIONS.USER.SET_TOKENS,
                        payload: data
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: ACTIONS.USER.LOG_OUT
                });
            });
    };
};

export const signUp = (data, role, navigate) => {
    const {
        email,
        password,
        birthDate,
        first_name,
        last_name,
        location,
        telephone,
        clinic,
        primarySpecialty,
        secondarySpecialty
    } = data;
    return async (dispatch) => {
        await apiPost({
            url: "/auth/sign-up",
            data: {
                email,
                password,
                role,
                birthDate,
                firstName: first_name,
                lastName: last_name,
                location,
                telephone,
                clinicId: clinic,
                primarySpecialty,
                secondarySpecialty
            }
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.USER.SET_TOKENS,
                    payload: data
                });
                navigate("/");
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
    }
}

export const getUserInfo = (id) => {
    return async (dispatch) => {
        await apiGet({
            url: `/users/${id}`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.USER.SET_USER,
                    payload: data
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

export const updateUserInfo = (userId, values, prevPrimarySpecialty, prevSecondarySpecialty, role) => {
    const {
        first_name,
        last_name,
        birthDate,
        location,
        telephone,
        primarySpecialty,
        secondarySpecialty
    } = values;
    const date = Moment(birthDate, "DD/MM/YYYY").toDate();

    return async (dispatch) => {
        await apiPut({
            url: "/users/update-user-info",
            data: {
                userId,
                birthDate: Moment(date).format("MM/DD/YYYY"),
                firstName: first_name,
                lastName: last_name,
                location,
                telephone,
            }
        })
            .then(() => {
                if (role === 3 && Number(prevPrimarySpecialty) !== Number(primarySpecialty)) {
                    dispatch(removeDoctorSpecialty(userId, prevPrimarySpecialty));
                    setTimeout(() => {
                        dispatch(addDoctorSpecialty(userId, Number(primarySpecialty), true));
                    }, 300);
                }
            })
            .then(() => {
                if (role === 3 && Number(prevSecondarySpecialty) !== Number(secondarySpecialty)) {
                    dispatch(removeDoctorSpecialty(userId, prevSecondarySpecialty));
                    if (secondarySpecialty !== "-1") {
                        setTimeout(() => {
                            dispatch(addDoctorSpecialty(userId, Number(secondarySpecialty), false));
                        }, 300);
                    }
                }
            })
            .then(() => {
                toast.success("Updated!");
                setTimeout(() => {
                    dispatch(getUserInfo(userId))
                }, 500);
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                } else {
                    toast.error("Something went wrong");
                }
            })
    }
}

export const updateUserPhoto = (data) => {
    return async (dispatch) => {
        apiPut({
            url: "/users/update-profile-photo",
            data: {data}
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.USER.ADD_PHOTO,
                    payload: data.photo_url
                });
                toast.success("Updated!");
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                } else {
                    toast.error("Something went wrong");
                }
            })
    }
}

export const sendRecoverPwEmail = (data, navigate) => {
    return async () => {
        apiPost({
            url: "/users/send-recover-password-email",
            data: {
                email: data
            }
        })
            .then(({}) => {
                navigate("/reset/password/success")
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
    }
}

export const updatePassword = (newPassword, navigate) => {
    return async () => {
        apiPut({
            url: "/users/update-password",
            data: {
                newPassword
            }
        })
            .then(() => {
                navigate("/login");
                toast.success("Your password was updated!")
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
    }
}