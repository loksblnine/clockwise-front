import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateUserData} from "../../../store/actions/userActions";

const EditProfileClient = ({customer}) => {
    const [customer_name, setCustomerName] = useState(customer.customer_name)
    const [customer_email, setCustomerEmail] = useState(customer.customer_email)
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()

    const editProfile = useCallback((e) => {
        e.preventDefault()
        const body = {customer_name, customer_email}
        dispatch(updateUserData("customers", body, customer.customer_id))
        inputRef.current.click()
    }, [dispatch, customer_name, customer_email])

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
                        <form onSubmit={event => editProfile(event)}>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Редактировать профиль</h2>
                                <button type="button" className="btn-close" data-dismiss="modal"
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="city_name">Изменить имя</label>
                                <input className="form-control" placeholder="Имя" value={customer_name}
                                       required onChange={e => setCustomerName(e.target.value)}
                                       pattern="[A-ZА-Яa-zа-я -]+"/>
                                <label htmlFor="city_name">Изменить email</label>
                                <input className="form-control" placeholder="Email" value={customer_email}
                                       required onChange={e => setCustomerEmail(e.target.value)}
                                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        ref={inputRef}>Закрыть
                                </button>
                                <button type="submit" className="btn btn-primary"
                                >Сохранить изменения
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileClient;
