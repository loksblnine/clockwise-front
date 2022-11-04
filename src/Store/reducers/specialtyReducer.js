import {ACTIONS} from "../../Utils/constants";

const initialState = {
    isReady: false,
    items: [],
};

const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SPECIALTiES.SET_SPECIALTiES: {
            return {
                ...state,
                items: action.payload,
                isReady: true,
            }
        }
        default:
            return state;
    }
};

export default specialtyReducer;