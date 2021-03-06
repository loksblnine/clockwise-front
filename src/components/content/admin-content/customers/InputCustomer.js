import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {addCustomer} from "../../../../store/actions/customerActions";
import {emailPattern, stringPattern} from "../../../../utils/constants";

const InputCustomer = () => {
    const [customer_name, setCustomerName] = useState("")
    const [customer_email, setCustomerEmail] = useState("")

    const inputRef = React.useRef(null)
    const dispatch = useDispatch()

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        const body = {customer_name, customer_email}
        dispatch(addCustomer(body))
        inputRef.current.click()
    }, [dispatch,customer_email, customer_name])
    return (
        <div>
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
                                <label htmlFor="name">ФИО покупателя</label>
                                <input className="form-control" placeholder="Иван Иванович Иванов" value={customer_name}
                                       name="name"
                                       onChange={e => setCustomerName(e.target.value)} required
                                       pattern={stringPattern}
                                />
                                <label htmlFor="email">e-mail</label>
                                <input className="form-control" value={customer_email} name="email" type="email"
                                       onChange={e => setCustomerEmail(e.target.value)}
                                       required
                                       pattern={emailPattern}
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
        </div>)
}
export default InputCustomer;
