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
            dispatch({
                type: ACTIONS.MESSAGE.SET_ERROR,
                payload: "Invalid email or password"
            });
            // toast.error("Use correct credentials");
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

export const updateUserInfo = (userId, first_name, last_name, birth_date, location, telephone, prevPrimarySpecialty, primarySpecialty, prevSecondarySpecialty, secondarySpecialty, role) => {
    const date = Moment(birth_date, "DD/MM/YYYY").toDate();

    return async (dispatch) => {
        await apiPut({
            url: "/users/update-user-info",
            data: {
                userId,
                birthDate: Moment(date).format("MM/DD/YYYY"),
                firstName: first_name,
                lastName: last_name,
                location,
                telephone
            }
        })
          .then(() => {
              if (role === 3 && prevPrimarySpecialty && Number(prevPrimarySpecialty) !== Number(primarySpecialty)) {
                  dispatch(removeDoctorSpecialty(userId, prevPrimarySpecialty));
              }
          })
          .then(() => {
              if (role === 3 && prevSecondarySpecialty && Number(prevSecondarySpecialty) !== Number(secondarySpecialty)) {
                  dispatch(removeDoctorSpecialty(userId, prevSecondarySpecialty));
              }
          })
          .then(() => {
              if (role === 3 && primarySpecialty && Number(prevPrimarySpecialty) !== Number(primarySpecialty))  {
                  dispatch(addDoctorSpecialty(userId, Number(primarySpecialty), true));
              }
          })
          .then(() => {
              if (role === 3 && secondarySpecialty !== "-1" && Number(prevSecondarySpecialty) !== Number(secondarySpecialty)) {
                  dispatch(addDoctorSpecialty(userId, Number(secondarySpecialty), false));
              }
          })
          .then(() => {
              toast.success("Updated!")
              dispatch(getUserInfo(userId))
          })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                } else {
                    dispatch({
                        type: ACTIONS.MESSAGE.SET_ERROR,
                        payload: "Something went wrong"
                    });
                }
                toast.error("Something went wrong");
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
                dispatch({
                    type: ACTIONS.MESSAGE.SET_MESSAGE,
                    payload: "Success!"
                });
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    dispatch(checkAuth())
                } else {
                    dispatch({
                        type: ACTIONS.MESSAGE.SET_ERROR,
                        payload: "Something went wrong"
                    });
                }
                toast.error("Something went wrong");
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
            .catch((e) => {
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
            .then(({data}) => {
                navigate("/login");
                toast.success("Your password was updated!")
            })
            .catch((e) => {
                toast.error("Something went wrong");
            })
    }
}