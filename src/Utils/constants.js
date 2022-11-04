import {createTheme} from "@mui/material/styles";

export const ACTIONS = {
    USER: {
        SET_TOKENS: "SET_TOKENS",
        SET_USER: "SET_USER",
        ADD_PHOTO: "ADD_PHOTO",
        REMOVE_PHOTO: "REMOVE_PHOTO",
        LOG_OUT: "LOG_OUT",
    },
    DOCTOR: {
        SET_DOCTORS: "SET_DOCTORS",
        SET_PAGE: "SET_PAGE",
        SET_OLD_ITEMS: "SET_OLD_ITEMS",
        SET_FILTERED_ARRAY: "SET_FILTERED_ARRAY",
        CLEAR_FILTERED_ARRAY: "CLEAR_FILTERED_ARRAY",
        SET_READY_DOCTORS: "SET_READY_DOCTORS",
        SET_DOCTOR: "SET_DOCTOR",
        ADD_DOCTOR: "ADD_DOCTOR",
        EDIT_DOCTOR: "EDIT_DOCTOR",
        DELETE_DOCTOR: "DELETE_DOCTOR",
        ADD_DOCTOR_PHOTO: "ADD_DOCTOR_PHOTO"
    },
    CLINIC: {
        SET_CLINICS: "SET_CLINICS",
        SET_APPOINTMENT_TYPES_LIST: "SET_APPOINTMENT_TYPES_LIST",
        SET_CLINIC_APPOINTMENT_TYPES_LIST: "SET_CLINIC_APPOINTMENT_TYPES_LIST",
        ADD_TO_CLINIC_APPOINTMENT_TYPES_LIST: "ADD_TO_CLINIC_APPOINTMENT_TYPES_LIST",
        REMOVE_FROM_CLINIC_APPOINTMENT_TYPES_LIST: "REMOVE_FROM_CLINIC_APPOINTMENT_TYPES_LIST",
    },
    SPECIALTiES: {
        SET_SPECIALTiES: "SET_SPECIALTiES",
    },
    FEEDBACK: {
        SET_DOCTORS_FEEDBACK_LIST: "SET_DOCTORS_FEEDBACK_LIST",
        SET_PATIENTS_FEEDBACK_LIST: "SET_PATIENTS_FEEDBACK_LIST",
    },
    APPOINTMENT: {
        SET_APPOINTMENTS: "SET_APPOINTMENTS",
        SET_PAGE: "SET_PAGE",
        SET_FILTERED_ARRAY: "SET_FILTERED_ARRAY",
        CLEAR_FILTERED_ARRAY: "CLEAR_FILTERED_ARRAY",
        UPDATE_NOTICE: "UPDATE_NOTICE",
        UPDATE_TIME: "UPDATE_DATE",
        UPDATE_STATUS: "UPDATE_STATUS"
    },
    MESSAGE: {
        SET_MESSAGE: "SET_MESSAGE",
        SET_ERROR: "SET_ERROR"
    }
}

export const LIMIT_ITEM_PER_PAGE = 5;

export const calculateOffset = (page) => {
    return page * LIMIT_ITEM_PER_PAGE;
}

export const theme = createTheme({
    palette: {
        success: {
            light: '#36B37E',
            main: '#36B37E',
        },
        error: {
            light: '#C14847',
            main: '#C14847',
        },
        primary: {
            main: '#47C0C1',
            light: '#47C0C1',
            dark: '#343760',
            contrastText: '#fff',
        },
    },
});

export const appointmentsTypes = {
    "drug order": "drug-orders",
    "appointment": "appointments",
    "doctor transfer": "transfers"
}
