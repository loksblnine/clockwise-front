import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setActivate} from "../../../../http/userAPI";

const SuccessRegister = () => {
    const token = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()
    localStorage.setItem('token', token)
    useEffect(() => {
        dispatch(setActivate())
    }, [dispatch])

    return (
        <div>
            <h3>Активация прошла успешно</h3>
        </div>
    );
};

export default SuccessRegister;
