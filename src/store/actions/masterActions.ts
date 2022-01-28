import {ACTIONS} from "../../utils/constants";
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
            type: ACTIONS.MASTERS.SET_MASTERS,
            payload: data
        });
    }
}

export const setReadyMasters = (isReady: boolean) => ({
    type: ACTIONS.MASTERS.SET_READY_MASTERS,
    payload: isReady
});

export const updateMaster = (master: Master, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "put",
            data: master,
            url: `/masters/${id}`
        })
        dispatch({
            type: ACTIONS.MASTERS.UPDATE_MASTER,
            payload: data
        });
    }
}

export const addMaster = (master: Master) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: master,
            url: "/masters"
        })
        dispatch({
            type: ACTIONS.MASTERS.ADD_MASTER,
            payload: data
        });
    }
}
export const activeMaster = (id: number, active: boolean) => {
    return async (dispatch: any) => {
        await instance({
            method: "put",
            url: `/auth/approve-master/${id}?active=${active}`
        })
        dispatch({
            type: ACTIONS.USER.ADMIN.APPROVE_MASTER,
            payload: {id, active}
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
            type: ACTIONS.MASTERS.ADD_CITY_AT_MASTER,
            payload: data
        });
    }
}
export const deleteCityAtMaster = (body: any) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            data: body,
            url: `/deps`
        })
        dispatch({
            type: ACTIONS.MASTERS.DELETE_CITY_AT_MASTER,
            payload: body
        });
    }
}
export const approveOrder = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "put",
            url: `/auth/approve-order/${id}`
        })
        dispatch({
            type: ACTIONS.MASTERS.APPROVE_ORDER,
            payload: id
        });
    }
}

export const deleteMaster = (id: number) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            url: `/masters/${id}`
        })
        dispatch({
            type: ACTIONS.MASTERS.DELETE_MASTER,
            payload: id
        });
    }
}
