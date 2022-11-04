import {ACTIONS} from "../../Utils/constants";

const initialState = {
    isReady: false,
    user: {
        id: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        telephone: "",
        photo_url: null,
        location: "",
        role: 0,
        email: "",
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.USER.SET_TOKENS: {
            const {accessToken, refreshToken, user_id, role} = action.payload;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return {
                ...state,
                user: {
                    ...state.user,
                    id: user_id,
                    role
                }
            };
        }
        case ACTIONS.USER.SET_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                isReady: true
            };
        }
        case ACTIONS.USER.ADD_PHOTO: {
            return {
                ...state,
                user: {
                    ...state.user,
                    photo_url: action.payload
                }
            };
        }
        case ACTIONS.USER.LOG_OUT: {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            return {
                ...state,
                user: {},
                isReady: true
            };
        }
        default:
            return state;
    }
};

export default userReducer;