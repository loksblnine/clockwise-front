import React from 'react';
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const SuccessfulPayment = () => {
    const token = window.location.pathname.split('/')[1]
    if (!token) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            {toast("Оплата прошла успешно!")}
            <Redirect to={'/'}/>
        </div>
    );
};

export default SuccessfulPayment;
