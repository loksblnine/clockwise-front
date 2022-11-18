import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    pending: {
        items: [],
        page: 0,
        loadNext: true,
        isReady: false
    },
    done: {
        items: [],
        page: 0,
        loadNext: true,
        isReady: false
    },
    patient: null,
};


const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.APPOINTMENT.SET_PENDING_APPOINTMENTS: {
            if (action.payload.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    pending: {
                        items: state.pending.items.concat(action.payload),
                        isReady: true,
                        loadNext: false
                    }
                }
            }
            return {
                ...state,
                pending: {
                    items: state.pending.items.concat(action.payload),
                    isReady: true,
                    loadNext: true,
                    page: state.pending.page + 1
                }
            }
        }
        case ACTIONS.APPOINTMENT.SET_DONE_APPOINTMENTS: {
            if (action.payload.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    done: {
                        items: state.done.items.concat(action.payload),
                        isReady: true,
                        loadNext: false
                    }
                }
            }
            return {
                ...state,
                done: {
                    items: state.done.items.concat(action.payload),
                    isReady: true,
                    loadNext: true,
                    page: state.done.page + 1
                }
            }
        }
        case ACTIONS.APPOINTMENT.SET_PAGE: {
            if (action.payload.type === 'pending') {
                return {
                    ...state,
                    pending: {
                        ...state.pending,
                        page: action.payload.value
                    }
                }
            }
            return {
                ...state,
                done: {
                    ...state.done,
                    page: action.payload.value
                }
            }
        }
        case ACTIONS.APPOINTMENT.UPDATE_NOTICE: {
            const newArr = state.pending.items.map(obj => {
                if (obj.id === action.payload.id) {
                    return {...obj, notice: action.payload.notice};
                }

                return obj;
            });

            return {
                ...state,
                pending: {
                    ...state.pending,
                    items: newArr
                }
            };
        }
        case ACTIONS.APPOINTMENT.SET_PATIENT: {
            return {
                ...state,
                patient: action.payload
            }
        }
        case ACTIONS.APPOINTMENT.UPDATE_REQUEST_NOTICE: {
            const newArr = state.patient.map(obj => {
                if (obj.id === action.payload.id) {
                    return {...obj, notice: action.payload.notice};
                }

                return obj;
            });

            return {
                ...state,
                patient: newArr
            };
        }
        case ACTIONS.APPOINTMENT.UPDATE_REQUEST_STATUS: {
            const newArr = state.patient.map(obj => {
                if (obj.id === action.payload.id) {
                    return {...obj, status_id: action.payload.statusId};
                }

                return obj;
            });

            return {
                ...state,
                patient: newArr
            };
        }
        case ACTIONS.APPOINTMENT.REMOVE_FROM_LIST: {
            const id = action.payload;
            const newArr = state.pending.items.filter((item) => item.id !== id);

            return {
                ...state,
                pending: {
                    ...state.pending,
                    items: newArr
                }
            }
        }
        case ACTIONS.APPOINTMENT.CLEAR_ARRAY: {
            return {
                ...state,
                pending: {
                    items: [],
                    page: 0,
                    loadNext: true,
                    isReady: false
                },
                done: {
                    items: [],
                    page: 0,
                    loadNext: true,
                    isReady: false
                },
                patient: null,
            }
        }

        default:
            return state;
    }
};

export default appointmentReducer;