import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {getCustomersIntoStore} from "../../getData";
import axios from "axios";
import {instance} from "../../../../http/headerPlaceholder.instance";

const EditCustomer = ({customer}) => {
    const [customer_name, setCustomerName] = useState(customer.customer_name)
    const [customer_email, setCustomerEmail] = useState(customer.customer_email)
    const {DB} = useContext(Context);
    const inputRef = React.useRef(null)
    const updateCustomer = async (e) => {
        e.preventDefault()
        try {
            const body = {customer_name, customer_email}
            instance({
                method: "PUT",
                data: body,
                url: `/customers/${customer.customer_id}`
            })
                .then((resp) => toast(resp.data))
                .then(() => getCustomersIntoStore(DB))
                .catch(() => toast.error("Данные не обновлены"))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${customer.customer_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${customer.customer_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => updateCustomer(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать покупателя</h2>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name">ФИО покупателя</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={customer_name}
                                       name="name"
                                       onChange={e => setCustomerName(e.target.value)} required
                                       pattern="[A-ZА-Яa-zа-я -]+"
                                />
                                <label htmlFor="email">e-mail</label>
                                <input className="form-control" value={customer_email} name="email" type="email"
                                       onChange={e => setCustomerEmail(e.target.value)}
                                       required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditCustomer;