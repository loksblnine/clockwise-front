import * as constants from "../../constants";
import {instance} from "../../http/headerPlaceholder.instance";

type Master = {
    master_id: number
    master_name: string,
    email: string,
    ranking: number,
    isApproved: boolean
}

export const setMasters = (page: number) => {
    return async (dispatch: any) => {
        const {data}: any = await instance({
            method: "get",
            url: `/masters/offset/${page}`
        })
        dispatch({
            type: constants.ACTIONS.MASTERS.SET_MASTERS,
            payload: data
        });
    }
}

export const setReadyMasters = (isReady: boolean) => ({
    type: constants.ACTIONS.MASTERS.SET_READY_MASTERS,
    payload: isReady
});

export const updateMaster = (master: Master, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "PUT",
            data: master,
            url: `/masters/${id}`
        })
        dispatch({
            type: constants.ACTIONS.MASTERS.UPDATE_MASTER,
            payload: data
        });
    }
}

export const addMaster = (master: Master) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "POST",
            data: master,
            url: "/masters"
        })
        dispatch({
            type: constants.ACTIONS.MASTERS.ADD_MASTER,
            payload: data
        });
    }
}
export const addCityToMaster = (body: any) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: body,
            url: '/deps'
        })
        dispatch({
            type: constants.ACTIONS.MASTERS.ADD_CITY_AT_MASTER,
            payload: data
        });
    }
}

export const deleteMaster = (id: number) => ({
    type: constants.ACTIONS.MASTERS.DELETE_MASTER,
    payload: id
});
