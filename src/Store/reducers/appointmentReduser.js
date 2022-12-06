import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    users: {
        items: [],
        page: 0,
        loadNext: true,
        isReady: false,
    },
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
        case ACTIONS.APPOINTMENT.SET_USERS_HAVING_PENDING: {
            if (action.payload.data.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    users: {
                        ...state.users,
                        items: state.users.items.concat(action.payload.data),
                        isReady: true,
                        loadNext: false
                    }
                }
            }
            return {
                ...state,
                users: {
                    ...state.users,
                    items: state.users.items.concat(action.payload.data),
                    isReady: true,
                    loadNext: true,
                    page: state.users.page + 1
                }
            }
        }
        case ACTIONS.APPOINTMENT.DELETE_USER_WITHOUT_PENDING: {
            return {
                ...state,
                users: {
                    ...state.users,
                    items: state.users.items.filter((el) => el.user_id !== action.payload.id)
                }
            }
        }
        case ACTIONS.APPOINTMENT.SET_PENDING_APPOINTMENTS: {
            if (action.payload.length < LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    pending: {
                        ...state.pending,
                        items: state.pending.items.concat(action.payload),
                        isReady: true,
                        loadNext: false
                    }
                }
            }
            return {
                ...state,
                pending: {
                    ...state.pending,
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
                        ...state.done,
                        items: state.done.items.concat(action.payload),
                        isReady: true,
                        loadNext: false
                    }
                }
            }
            return {
                ...state,
                done: {
                    ...state.done,
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
        case ACTIONS.APPOINTMENT.UPDATE_REQUEST_TIME: {
            const newArr = state.patient.map(obj => {
                if (obj.id === action.payload.id) {
                    return {...obj, date: action.payload.date};
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
        case ACTIONS.APPOINTMENT.CLEAR_USERS: {
            return {
                ...state,
                users: {
                    items: [],
                    page: 0,
                    loadNext: true,
                    isReady: false
                }
            }
        }
        default:
            return state;
    }
};

export default appointmentReducer;