import {ACTIONS, LIMIT_ITEM_PER_PAGE} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
    managerToEdit: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADMIN.SET_MANAGERS: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            }
        }
        case ACTIONS.ADMIN.SET_MANAGER: {
            return {
                ...state,
                managerToEdit: action.payload
            };
        }
        case ACTIONS.ADMIN.EDIT_MANAGER: {
            return {
                ...state,
                managerToEdit: {
                    ...state.managerToEdit,
                    birth_date: action.payload.birthDate,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    location: action.payload.location,
                    telephone: action.payload.telephone,
                },
            };
        }
        case ACTIONS.ADMIN.ADD_MANAGER_PHOTO: {
            return {
                ...state,
                managerToEdit: {
                    ...state.managerToEdit,
                    photo_url: action.payload.photo_url
                },
            };
        }

        default:
            return state;
    }
};

export default adminReducer;