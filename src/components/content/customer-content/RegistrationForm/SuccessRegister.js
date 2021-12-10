import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {sendConfirmRegistrationMail} from "../../workWithData";

const SuccessRegister = () => {
    const location = useLocation()
    console.log(location.state.email)
    useEffect(() => {
        sendConfirmRegistrationMail(location.state.email)
    }, [])
    return (
        <div className="router">
            <h3>Проверьте свой почтовый адрес</h3>
        </div>
    );
};

export default SuccessRegister;
