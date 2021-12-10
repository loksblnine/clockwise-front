import React, {useEffect} from 'react';
import {setActivate} from "../../../../http/userAPI";
import {useDispatch} from "react-redux";

const SuccessRegister = () => {
    const token = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()
    localStorage.setItem('token', token)
    useEffect(() => {
        dispatch(setActivate())
    }, [])

    return (
        <div className="router">
            <h3>Активация прошла успешно</h3>
        </div>
    );
};

export default SuccessRegister;
