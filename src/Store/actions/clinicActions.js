import {toast} from "react-toastify";
import {apiGet, apiPut} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../Utils/constants";

export const getClinicsList = () => {
    return async (dispatch) => {
        await apiGet({
            url: `/clinics/all`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.CLINIC.SET_CLINICS,
                    payload: data
                });
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};

export const getAppointmentTypesList = () => {
    return async (dispatch) => {
        await apiGet({
            url: `/appointment-types/`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.CLINIC.SET_APPOINTMENT_TYPES_LIST,
                    payload: data
                });
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};

export const getClinicAppointmentTypesList = (clinicId) => {
    return async (dispatch) => {
        await apiGet({
            url: `/clinics/get-appointment-types?clinicId=${clinicId}`
        })
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.CLINIC.SET_CLINIC_APPOINTMENT_TYPES_LIST,
                    payload: data
                });
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};

export const updateClinicAppointmentTypesList = (clinicId, data) => {
    return async () => {
        await apiPut({
            url: `/clinics/update-appointment-types`,
            data: {
                clinicId,
                appointmentTypesList: data.map((el) => el.id)
            }
        })
            .then((res) => {
                if (res) {
                    toast.success("Updated!");
                }
            })
            .catch(() => {
                toast.error("Something went wrong");
            });
    };
};