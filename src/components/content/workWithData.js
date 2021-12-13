import {instance} from "../../http/headerPlaceholder.instance";
import {toast} from "react-toastify";

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
        data: order.base64Arr
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
                .then(() => {
                    toast.dismiss()
                    toast("Письмо отправлено вам на почту")
                    history.push('/')
                })
        })
        .catch(() => {
            toast.dismiss()
            toast.info("Возникли трудности c сервером")
        })
}
export const sendConfirmRegistrationMail = (email) => {
    const messageBody = {
        email
    }
    instance({
        method: "POST",
        data: messageBody,
        url: "/send/confirm-registration"
    })
        .then(() => {
            toast.dismiss()
            toast("Письмо отправлено вам на почту")
        })
}
//endregion