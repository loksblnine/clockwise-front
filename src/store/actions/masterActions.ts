import * as constants from "../../constants";

type Master = {
    master_id: number
    master_name: string,
    email: string,
    ranking: number,
    isApproved: boolean
}

export const setMasters = (masters: any []) => ({
    type: constants.ACTIONS.MASTERS.SET_MASTERS,
    payload: masters
});

export const setReadyMasters = (isReady: boolean) => ({
    type: constants.ACTIONS.MASTERS.SET_READY_MASTERS,
    payload: isReady
});

export const updateMaster = (master: Master) => ({
    type: constants.ACTIONS.MASTERS.UPDATE_MASTER,
    payload: master
});

export const addMaster = (master: Master) => ({
    type: constants.ACTIONS.MASTERS.ADD_MASTER,
    payload: master
});

export const deleteMaster = (id: number) => ({
    type: constants.ACTIONS.MASTERS.DELETE_MASTER,
    payload: id
});
