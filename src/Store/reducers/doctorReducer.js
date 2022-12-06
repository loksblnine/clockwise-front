import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
    nextItems: [],
    filteredItems: [],
    nextFilteredItems: [],
    doctorToEdit: null,
    page: 0,
    loadNext: true
};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.DOCTOR.UPDATE_DOCTOR: {
            const arr = state.items.map((el) => {
                if (Number(el.user_id) === Number(action.payload.user_id)) {
                    return action.payload
                }
                return el
            })
            const filtArr = state.filteredItems.map((el) => {
                if (Number(el.user_id) === Number(action.payload.user_id)) {
                    return action.payload
                }
                return el
            })
            return {
                ...state,
                doctorToEdit: null,
                items: arr,
                filteredItems: filtArr
            }
        }
        case ACTIONS.DOCTOR.SET_DOCTORS: {
            if (action.payload.length === LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    items: state.items.concat(state.nextItems),
                    filteredItems: state.filteredItems.concat(state.nextItems),
                    nextItems: action.payload,
                    isReady: true,
                    loadNext: true,
                    page: state.page + 1
                };
            }
            return {
                ...state,
                items: state.items.concat(state.nextItems, action.payload),
                filteredItems: state.filteredItems.concat(state.nextItems, action.payload),
                nextItems: [],
                isReady: true,
                loadNext: false
            };
        }
        case ACTIONS.DOCTOR.SET_PAGE: {
            return {
                ...state,
                page: action.payload
            };
        }
        case ACTIONS.DOCTOR.SET_FILTERED_ARRAY: {
            if (action.payload.length === LIMIT_ITEM_PER_PAGE) {
                return {
                    ...state,
                    filteredItems: state.filteredItems.concat(state.nextFilteredItems),
                    nextFilteredItems: action.payload,
                    isReady: true,
                    loadNext: true,
                    page: state.page + 1
                };
            }
            return {
                ...state,
                filteredItems: state.filteredItems.concat(state.nextFilteredItems, action.payload),
                nextFilteredItems: [],
                isReady: true,
                loadNext: false
            };
        }
        case ACTIONS.DOCTOR.CLEAR_FILTERED_ARRAY: {
            return {
                ...state,
                isReady: false,
                filteredItems: [],
                nextFilteredItems: [],
                page: 0,
                loadNext: true
            };
        }
        case ACTIONS.DOCTOR.SET_OLD_ITEMS: {
            return {
                ...state,
                isReady: true,
                filteredItems: state.items,
                page: Math.ceil(state.items.length / LIMIT_ITEM_PER_PAGE) + 1,
                loadNext: state.items.length % LIMIT_ITEM_PER_PAGE === 0
            };
        }
        case ACTIONS.DOCTOR.SET_READY_DOCTORS: {
            return {
                ...state,
                isReady: action.payload
            };
        }
        case ACTIONS.DOCTOR.SET_DOCTOR: {
            const arr = state.filteredItems?.map((item) => {
                if (item.user_id === +action.payload.user_id) {
                    return action.payload
                } else {
                    return item
                }
            });

            if (state.filteredItems.length) {
                return {
                    ...state,
                    filteredItems: arr,
                    doctorToEdit: action.payload
                };
            } else {
                return {
                    ...state,
                    doctorToEdit: action.payload
                };
            }
        }
        case ACTIONS.DOCTOR.EDIT_DOCTOR: {
            const arr = state.filteredItems.map((item) => {
                if (item.user_id === +action.payload.userId) {
                    return {
                        ...item,
                        user: {
                            ...item.user,
                            birth_date: action.payload.birthDate,
                            firstName: action.payload.firstName,
                            lastName: action.payload.lastName,
                            location: action.payload.location,
                            telephone: action.payload.telephone,
                        }
                    };
                }
            });
            return {
                ...state,
                doctorToEdit: arr[0],
            };
        }
        case ACTIONS.DOCTOR.ADD_DOCTOR_PHOTO: {
            const arr = state.filteredItems.map((item) => {
                if (item.user_id === +action.payload.userId) {
                    return {
                        ...item,
                        user: {
                            ...item.user,
                            photo_url: action.payload.photo_url
                        }
                    };
                }
            });
            return {
                ...state,
                doctorToEdit: arr[0],
            };
        }

        default:
            return state;
    }
};

export default doctorReducer;