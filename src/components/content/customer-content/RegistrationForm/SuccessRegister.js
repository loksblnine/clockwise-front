import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {sendConfirmRegistrationMail} from "../../workWithData";

const SuccessRegister = () => {
    const location = useLocation()
    useEffect(() => {
        sendConfirmRegistrationMail(location.state.email)
    }, [])
    return (
        <div>
            <h3>Проверьте свой почтовый адрес</h3>
        </div>
    );
};

export default SuccessRegister;
