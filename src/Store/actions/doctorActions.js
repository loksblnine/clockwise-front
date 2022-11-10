import {toast} from "react-toastify";
import {apiDelete, apiPost, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS, calculateOffset, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";
import {checkAuth} from "./userActions";

export const getDoctorsList = (value = '', page = 0) => {
  return async (dispatch) => {
    try {
      const {data} = await apiPost({
        url: `/doctors/all?name=${value}&limit=${LIMIT_ITEM_PER_PAGE}&offset=${calculateOffset(page)}`
      });
      if (value) {
        dispatch({
          type: ACTIONS.DOCTOR.SET_FILTERED_ARRAY,
          payload: data
        });
      } else {
        dispatch({
          type: ACTIONS.DOCTOR.SET_DOCTORS,
          payload: data
        });
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
};

export const setReadyDoctors = (isReady) => ({
  type: ACTIONS.DOCTOR.SET_READY_DOCTORS,
  payload: isReady
});

export const registerDoctor = (data) => {
  const {
    email,
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
      url: "/manager/register-doctor",
      data: {
        email,
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
          type: ACTIONS.MESSAGE.SET_MESSAGE,
          payload: "Success!"
        });
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
};

export const getDoctorById = (id) => {
  return async (dispatch) => {
    await apiPost({
      url: `/doctors/all?doctorId=${id}`
    })
      .then(({data}) => {
        dispatch({
          type: ACTIONS.DOCTOR.SET_DOCTOR,
          payload: data[0]
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

export const editDoctorInfo = (values, userId, prevPrimarySpecialty, prevSecondarySpecialty) => {
  const {
    first_name,
    last_name,
    birthDate,
    location,
    telephone,
    primarySpecialty,
    secondarySpecialty = ""
  } = values;
  return async (dispatch) => {
    await apiPut({
      url: `users/update-by-manager`,
      data: {
        userId,
        birthDate,
        firstName: first_name,
        lastName: last_name,
        location,
        telephone
      }
    })
      .then(() => {
        if (prevPrimarySpecialty && Number(prevPrimarySpecialty) !== Number(primarySpecialty)) {
          dispatch(removeDoctorSpecialty(userId, prevPrimarySpecialty));
        }
      })
      .then(() => {
        if (prevSecondarySpecialty && Number(prevSecondarySpecialty) !== Number(secondarySpecialty)) {
          dispatch(removeDoctorSpecialty(userId, prevSecondarySpecialty));
        }
      })
      .then(() => {
        if (primarySpecialty && Number(prevPrimarySpecialty) !== Number(primarySpecialty))  {
          dispatch(addDoctorSpecialty(userId, Number(primarySpecialty), true));
        }
      })
      .then(() => {
        if (secondarySpecialty !== "-1" && Number(prevSecondarySpecialty) !== Number(secondarySpecialty)) {
          dispatch(addDoctorSpecialty(userId, Number(secondarySpecialty), false));
        }
      })
      .then(async () => {
        toast.success("Updated!")
        const {data} = await apiPost({
          url: `/doctors/all?doctorId=${userId}`
        })
        dispatch({
          type: ACTIONS.DOCTOR.UPDATE_DOCTOR,
          payload: data[0]
        })
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

export const updateDoctorPhoto = (userId, data) => {
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
          type: ACTIONS.DOCTOR.ADD_DOCTOR_PHOTO,
          payload: {
            data
          }
        });
        dispatch(getDoctorById(userId));
      })
      .catch((e) => {
        if (e.response.status === 401) {
          dispatch(checkAuth());
        }
        toast.error("Something went wrong");
      });
  };
};

export const addDoctorSpecialty = (doctorId, specialtyId, isMain) => {
  return async (dispatch) => {
    return await apiPost({
      url: `/doctors/${doctorId}/add-specialties`,
      data: {
        specialties: [{id: specialtyId, isMain}]
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

export const removeDoctorSpecialty = (doctorId, specialtyId) => {
  return async (dispatch) => {
    return await apiDelete({
      url: `/doctors/${doctorId}/remove-specialty`,
      data: {
        doctorId,
        specialtyId
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

export const deleteDoctor = (id, handleClose, navigate) => {
  return async () => {
    await apiDelete({
      url: `/doctors/${id}`,
      data: {id}
    })
      .then(({data}) => {
        handleClose();
        navigate("/");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  };
};


