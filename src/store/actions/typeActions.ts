import {instance} from "../../http/headerPlaceholder.instance";
import {ACTIONS} from "../../utils/constants";

type Type = {
    work_id: number,
    description: string,
    time: string,
    price: number
}

export const setTypes = () => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: "/types"
        })
        dispatch({
            type: ACTIONS.TYPES.SET_TYPES,
            payload: data
        })
    }
}

export const updateType = (type: Type, work_id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "PUT",
            data: type,
            url: `/types/${work_id}`
        })
        dispatch({
            type: ACTIONS.TYPES.UPDATE_TYPE,
            payload: data
        });
    }
}

export const addType = (type: Type) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: type,
            url: "/types"
        })
        dispatch({
            type: ACTIONS.TYPES.ADD_TYPE,
            payload: data
        });
    }
}

export const deleteType = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "DELETE",
            url: `/types/${id}`
        })
        dispatch({
            type: ACTIONS.TYPES.DELETE_TYPE,
            payload: id
        });
    }
}
