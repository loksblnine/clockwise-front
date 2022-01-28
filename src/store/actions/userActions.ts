import {login} from "../../http/userAPI";
import {instance} from "../../http/headerPlaceholder.instance";
import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";
import {ACTIONS, PATH} from "../../utils/constants";

export const setUser = (email: string, password: string, history: any) => {
    return async (dispatch: any) => {
        login(email, password).then(({token}) => {
            dispatch({
                type: ACTIONS.USER.SET_USER,
                payload: {token}
            })
            // @ts-ignore
            history.push(PATH[jwt_decode(token).role])
        })
            .catch(() =>
                toast("Проверьте логин или пароль")
            )
    }
}

export const setUserData = (type: string, email: string) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "get",
            url: `/${type}/email/${email}`
        })
        dispatch({
            type: ACTIONS.USER.SET_DATA,
            payload: data
        })
    }
}
export const setPhotos = (photo: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: ACTIONS.USER.ADD_PHOTO,
            payload: photo
        })
    }
}
export const removePhoto = (id: number) => {
    return async (dispatch: any) => {
        dispatch({
            type: ACTIONS.USER.REMOVE_PHOTO,
            payload: id
        })
    }
}
export const clearPhotos = () => {
    return async (dispatch: any) => {
        dispatch({
            type: ACTIONS.USER.CLEAR_PHOTOS,
        })
    }
}
export const setMasterNewCity = (body: any) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "post",
            data: body,
            url: `/deps`
        })
        dispatch({
            type: ACTIONS.USER.MASTER.ADD_CITY,
            payload: data
        })
    }
}
export const deleteMasterCity = (body: any) => {
    return async (dispatch: any) => {
        await instance({
            method: "delete",
            data: body,
            url: `/deps`
        })
        dispatch({
            type: ACTIONS.USER.MASTER.DELETE_CITY,
            payload: body
        });
    }
}
export const setReadyUser = (bool: boolean) => ({
    type: ACTIONS.USER.SET_READY_USER,
    payload: bool
});

export const updateUserData = (type: string, body: any, id: number) => {
    return async (dispatch: any) => {
        const {data} = await instance({
            method: "put",
            data: body,
            url: `/${type}/${id}`
        })
        switch (type) {
            case "customers": {
                dispatch({
                    type: ACTIONS.USER.SET_DATA,
                    payload: data
                })
                break
            }
            case "masters": {
                dispatch({
                    type: ACTIONS.USER.SET_DATA,
                    payload: data
                })
                break
            }
            default: {
                break
            }
        }
    }
}
