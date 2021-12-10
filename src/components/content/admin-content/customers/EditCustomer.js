import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {updateCustomer} from "../../../../store/actions/customerActions";

const EditCustomer = ({customer}) => {
    const dispatch = useDispatch()
    const [customer_name, setCustomerName] = useState(customer.customer_name)
    const [customer_email, setCustomerEmail] = useState(customer.customer_email)
    const inputRef = React.useRef(null)
    const editCustomer = useCallback((e) => {
        e.preventDefault()
        const body = {customer_name, customer_email}
        dispatch(updateCustomer(body, customer.customer_id))
        inputRef.current.click()
    }, [customer_name, customer_email])
    return (
        <div>
            <button type="button" className="btn btn-warning" data-toggle="modal"
                    data-target={`#id${customer.customer_id}`}>
                Редактировать
            </button>

            <div className="modal fade" id={`id${customer.customer_id}`} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={event => editCustomer(event)}>
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
                                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+"
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
        </div>
    )
}

export default EditCustomer;