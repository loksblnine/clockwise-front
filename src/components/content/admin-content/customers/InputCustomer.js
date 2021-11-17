import React, {Fragment, useContext, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import {getCustomersIntoStore} from "../../getData";
import axios from "axios";

const InputCustomer = () => {
    const [customer_name, setCustomerName] = useState("")
    const [customer_email, setCustomerEmail] = useState("")

    const {DB} = useContext(Context);
    const inputRef = React.useRef(null)
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {customer_name, customer_email}
            axios.post(SERVER_URL + `/customers`, {
                ...body
            })
                .then(() => toast(`Покупатель ${customer_name} добавлен`))
                .then(() => getCustomersIntoStore(DB))
            inputRef.current.click()
        } catch (e) {
            toast.info("Server is busy at this moment")
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success mb-5" data-toggle="modal"
                    data-target="#addCustomer">
                Добавить
            </button>

            <div className="modal fade" id="addCustomer" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => onSubmitForm(event)}>
                            <div className="modal-header">
                                <h1 className="modal-title" id="exampleModalLabel">Добавить покупателя</h1>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor={`name`}>ФИО покупателя</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={customer_name}
                                       name={`name`}
                                       onChange={e => setCustomerName(e.target.value)} required/>
                                <label htmlFor={`email`}>e-mail</label>
                                <input className="form-control" value={customer_email} name={`email`} type={`email`}
                                       onChange={e => setCustomerEmail(e.target.value)}
                                       required //pattern="[A-ZА-Яa-zа-я -]+"
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
export default InputCustomer;