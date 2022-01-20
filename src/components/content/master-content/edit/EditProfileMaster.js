import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";

import {updateUserData} from "../../../../store/actions/userActions";

import {emailPattern, stringPattern} from "../../../../utils/constants";

const EditProfileClient = ({master}) => {
    const [master_name, setMasterName] = useState(master.master_name)
    const [email, setMasterEmail] = useState(master.email)
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()

    const editProfile = useCallback((e) => {
        e.preventDefault()
        const body = {master_name, email}
        dispatch(updateUserData("masters", body, master.master_id))
        inputRef.current.click()
    }, [dispatch, master_name, email, master.master_id])

    return (
        <div>
            <button type="button" className="btn btn-warning m-5" data-toggle="modal"
                    data-target={`#id${master.master_id}`}>
                Редактировать
            </button>
            <div className="modal fade" id={`id${master.master_id}`} tabIndex="-1" role="dialog"
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
                                <input className="form-control" placeholder="Имя" value={master_name}
                                       required onChange={e => setMasterName(e.target.value)}
                                       pattern={stringPattern}/>
                                <label htmlFor="city_name">Изменить email</label>
                                <input className="form-control" placeholder="Email" value={email}
                                       required onChange={e => setMasterEmail(e.target.value)}
                                       pattern={emailPattern}/>
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
