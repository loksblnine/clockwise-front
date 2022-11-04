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

export const getDoctorById = (id) => {
  return async (dispatch) => {
    apiPost({
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

export const editDoctorInfo = (values, userId) => {
  const {
    first_name,
    last_name,
    birthDate,
    location,
    telephone,
    primarySpecialty,
    secondarySpecialty,
    clinic
  } = values;
  return async (dispatch) => {
    apiPut({
      url: `users/update-by-manager`,
      data: {
        userId,
        birthDate,
        firstName: first_name,
        lastName: last_name,
        location,
        telephone,
        primarySpecialty,
        secondarySpecialty,
        clinic
      }
    })
      .then(() => {
        dispatch(getDoctorById(userId));
        dispatch({
          type: ACTIONS.MESSAGE.SET_MESSAGE,
          payload: "Success!"
        });
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

export const deleteDoctor = (id, handleClose, navigate) => {
  return async () => {
    apiDelete({
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

export const updateDoctorPhoto = (userId, data) => {
  return async (dispatch) => {
    apiPut({
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
