import React, {Fragment, useState} from "react";
import {SERVER_URL} from "../../../../constants";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const InputCustomer = () => {
    const [customer_name, setCustomerName] = useState("")
    const [customer_email, setCustomerEmail] = useState("")
    const history = useHistory()

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {customer_name, customer_email}
            await fetch(SERVER_URL + `/customers`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => console.log(data));
            history.go(0)
        } catch (e) {
            console.log(e.message)
        }


    }
    return (
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal"
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
                                       required
                                       pattern="/[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/"
                                       />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть
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