import {toast} from "react-toastify";
import {instance} from "../../http/headerPlaceholder.instance";

export const getFreeMasters = async (orderBody, setMasters) => {
    instance({
        method: "post",
        data: orderBody,
        url: `/masters/free`,
    })
        .then(({data}) => setMasters(data))
        .catch(() => toast.error("Возникли трудности"))
}
