import {instance} from "../../http/headerPlaceholder.instance";
import {toast} from "react-toastify";

//region send mails
export const sendConfirmationOrder = (order, master, history, photos) => {
    toast.loading("Обработка заказа")
    const T = order.date + "T" + order.time
    const orderBody = {
        master_id: master.master_id,
        customer_name: order.name,
        customer_email: order.email,
        city_id: order.city,
        order_time: T,
        work_id: order.type,
        data: photos
    }
    instance({
        method: "POST",
        data: orderBody,
        url: "/orders"
    })
        .then(({data}) => {
            const text = `${order.name}, бронь прошла успешно, мастер ${master["master.master_name"]} будет у вас ${order.date} в ${order.time}. Оплатите заказ по ссылке или в своем кабинете.`
            const messageBody = {
                email: orderBody.customer_email,
                message: text,
                order_time: orderBody.order_time,
                order_id: data.order_id
            }
            instance({
                method: "POST",
                data: messageBody,
                url: "/send/confirm-order"
            })
                .then(() => {
                    toast.dismiss()
                    toast("Письмо отправлено вам на почту")
                    //todo create page /pay
                    history.push(`/pay?order_id=${data.order_id}`)
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
