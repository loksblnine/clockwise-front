import React from 'react';
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const FailedPayment = () => {
    const token = window.location.pathname.split('/')[1]
    if (!token) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            {toast("Оплата не прошла, что-то пошло не так.")}
            <Redirect to={'/'}/>
        </div>
    );
};

export default FailedPayment;
