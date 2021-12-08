import {instance} from "../../http/headerPlaceholder.instance";
import * as constants from "../../constants";
import {toast} from "react-toastify";

//region delete
export const deleteMaster = async (id, dispatch) => {
    try {
        instance({
            method: "DELETE",
            url: `/masters/${id}`
        })
            .then(() =>
                dispatch({
                    type: constants.ACTIONS.MASTERS.DELETE_MASTER,
                    payload: id
                })
            )
            .then(() => toast("Мастер удален"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}

export const deleteCityAtMaster = async (city_id, master_id, dispatch) => {
    const body = {city_id, master_id}
    try {
        instance({
            method: "DELETE",
            data: body,
            url: `/deps`
        })
            .then(() => {
                dispatch({
                    type: constants.ACTIONS.MASTERS.DELETE_CITY_AT_MASTER,
                    payload: body
                })
            })
            .then(() => toast("Город у мастера удален"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}

export const deleteOrder = async (id, dispatch) => {
    try {
        instance({
            method: "DELETE",
            url: `/orders/${id}`
        })
            .then(() =>
                dispatch({
                    type: constants.ACTIONS.ORDERS.DELETE_ORDER,
                    payload: id
                })
            )
            .then(() => toast("Заказ удален"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}
//endregion
//region update
export const editMaster = (body, id, dispatch) => {
    try {
        instance({
            method: "PUT",
            data: body,
            url: `/masters/${id}`
        })
            .then(({data}) =>
                dispatch({
                    type: constants.ACTIONS.MASTERS.UPDATE_MASTER,
                    payload: data
                }))
            .then(() => toast("Изменения сохранены"))
            .catch(() => toast.error("Данные не обновлены"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}
export const editOrder = (body, id, dispatch) => {
    try {
        body.order.time = `${Number(body.order.time.split(':')[0])}:00`
        body.order.order_time = body.order.date + 'T' + body.order.time
        instance({
            method: "PUT",
            data: body.order,
            url: `/orders/${id}`
        })
            .then(({data}) =>
                dispatch({
                    type: constants.ACTIONS.ORDERS.UPDATE_ORDER,
                    payload: data
                }))
            .then(() => toast("Изменения сохранены"))
            .catch(() => toast.error("Данные не обновлены"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}

//endregion
//region add

export const postMaster = async (body, dispatch) => {
    try {
        instance({
            method: "POST",
            data: body,
            url: "/masters"
        })
            .then(({data}) => dispatch({
                type: constants.ACTIONS.MASTERS.ADD_MASTER,
                payload: data
            }))
            .then(() => toast(`Мастер ${body.master_name} добавлен`))
            .catch(() => toast.error("Город не добавлен"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}
export const addCityAtMaster = async (body, dispatch) => {
    try {
        instance({
            method: "post",
            data: body,
            url: '/deps'
        })
            .then(({data}) => dispatch({
                type: constants.ACTIONS.MASTERS.ADD_CITY_AT_MASTER,
                payload: data
            }))
            .then(() => toast("Город добавлен"))
            .catch(() => toast.error("Город не добавлен"))
    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}

export const postOrder = async (body, dispatch) => {
    try {
        body.order.time = `${Number(body.order.time.split(':')[0])}:00`
        body.order.order_time = body.order.date + 'T' + body.order.time
        instance({
            method: "POST",
            data: body.order,
            url: "/orders"
        })
            .then(({data}) => {
                dispatch({
                    type: constants.ACTIONS.ORDERS.ADD_ORDER,
                    payload: data
                })
            })
            .then(() => toast(`Заказ ${body.order.customer_name} добавлен`))
            .catch(() => toast.error("Заказ не добавлен"))

    } catch (e) {
        toast.info("Server is busy at this moment")
    }
}
//endregion
//region send mails
export const sendConfirmationOrder = (order, master, history) => {
    toast.loading("Обработка заказа")
    const text = `Спасибо за заказ ${order.name}, мастер ${master["master.master_name"]} будет у вас ${order.date} в ${order.time}`
    const T = order.date + "T" + order.time
    const orderBody = {
        master_id: master.master_id,
        customer_name: order.name,
        customer_email: order.email,
        city_id: order.city,
        order_time: T,
        work_id: order.type,
    }

    instance({
        method: "POST",
        data: orderBody,
        url: "/orders"
    })
        .then(() => {
            const messageBody = {
                email: orderBody.customer_email,
                message: text
            }
            instance({
                method: "POST",
                data: messageBody,
                url: "/send/confirm-order"
            })
                .then(() => toast.dismiss())
                .then(() => {
                    toast("Письмо отправлено вам на почту")
                    history.push('/')
                })
        })
        .catch(() => {
            toast.dismiss()
            toast.info("Возникли трудности c сервером")
        })
}
//endregion