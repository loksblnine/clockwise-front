import {toast} from "react-toastify";
import {instance} from "../../http/headerPlaceholder.instance";

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
        method: "post",
        data: orderBody,
        url: "/orders"
    })
        .then(({data}) => {
            const text = `${order.name}, бронь прошла успешно, мастер ${master.master_name} будет у вас ${order.date} в ${order.time}. Оплатите заказ по ссылке или в своем кабинете.`
            const messageBody = {
                email: orderBody.customer_email,
                message: text,
                order_time: orderBody.order_time,
                order_id: data.order_id,
                type: orderBody.work_id
            }
            instance({
                method: "post",
                data: messageBody,
                url: "/send/confirm-order"
            })
                .then(() => {
                    toast.dismiss()
                    toast("Письмо отправлено вам на почту")
                    history.push(`/pay?order_id=${data.order_id}&type=${orderBody.work_id}`)
                })
        })
        .catch((err) => {
            toast.dismiss()
            if (err.toString().split("code ")[1] === "405") {
                toast.info("Мастер только что перестал быть свободным, обновите страницу и/или выберете нового мастера")
            } else {
                toast.info("Возникли трудности c сервером")
            }
        })
}
export const sendConfirmRegistrationMail = (email) => {
    const messageBody = {
        email
    }
    instance({
        method: "post",
        data: messageBody,
        url: "/send/confirm-registration"
    })
        .then(() => {
            toast.dismiss()
            toast("Письмо отправлено вам на почту")
        })
}
//endregion
