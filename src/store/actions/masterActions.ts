import * as constants from "../../constants";

export const setMasters = (masters: any []) => ({
    type: constants.ACTIONS.MASTERS.SET_MASTERS,
    payload: masters
});

export const setReadyMasters = (bool: boolean) => ({
    type: constants.ACTIONS.MASTERS.SET_READY_MASTERS,
    payload: bool
});

export const updateMaster = (master: object) => ({
    type: constants.ACTIONS.MASTERS.UPDATE_MASTER,
    payload: master
});

export const addMaster = (master: object) => ({
    type: constants.ACTIONS.MASTERS.ADD_MASTER,
    payload: master
});

export const deleteMaster = (id: number) => ({
    type: constants.ACTIONS.MASTERS.DELETE_MASTER,
    payload: id
});
