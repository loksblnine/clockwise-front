import {ACTIONS} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
    appointmentTypesList: [],
    clinicAppointmentTypesList: []
};

const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CLINIC.SET_CLINICS: {
            return {
                ...state,
                items: action.payload,
                isReady: true,
            }
        }
        case ACTIONS.CLINIC.SET_APPOINTMENT_TYPES_LIST: {
            return {
                ...state,
                appointmentTypesList: action.payload,
            }
        }
        case ACTIONS.CLINIC.SET_CLINIC_APPOINTMENT_TYPES_LIST: {
            return {
                ...state,
                clinicAppointmentTypesList: action.payload,
            }
        }
        case ACTIONS.CLINIC.CLEAR_CLINIC_APPOINTMENT_TYPES_LIST: {
            return {
                ...state,
                clinicAppointmentTypesList: []
            }
        }
        case ACTIONS.CLINIC.ADD_TO_CLINIC_APPOINTMENT_TYPES_LIST: {
            return {
                ...state,
                clinicAppointmentTypesList: state.clinicAppointmentTypesList.concat(action.payload),
            }
        }
        case ACTIONS.CLINIC.REMOVE_FROM_CLINIC_APPOINTMENT_TYPES_LIST: {
            return {
                ...state,
                clinicAppointmentTypesList: state.clinicAppointmentTypesList.filter((el) => el.id !== action.payload.id),
            }
        }
        default:
            return state;
    }
};

export default clinicReducer;