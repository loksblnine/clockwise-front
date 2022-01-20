import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import * as constants from "../../../../utils/constants";

const RedirectingPage = () => {
    const token = window.location.pathname.split('/')[3]
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)
    useEffect(() => {
        dispatch({
            type: constants.ACTIONS.USER.SET_USER,
            payload: {token}
        })
    }, [dispatch])
    if (user.isReady) {
        return (
            <div>
                123
            </div>
        );
    }
    return <Redirect to="/access_succeed_client"/>

};

export default RedirectingPage;
