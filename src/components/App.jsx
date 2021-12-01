//libs
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {checkAuth} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
//css
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./header/Header";
import {Context} from "../index";
import AppRouter from "./AppRouter";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import jwt_decode from "jwt-decode";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log()
        sessionStorage.setItem('pageOrderList', "0")
        sessionStorage.setItem('pageCustomerList', "0")
        sessionStorage.setItem('pageMasterList', "0")
        checkAuth()
            .then(data => {
                if (data?.status === 200) {
                    user.setUser(jwt_decode(localStorage.getItem('token')).role)
                    user.setIsAuth(true)
                } else {
                    localStorage.removeItem('token')
                    user.setUser({})
                    user.setIsAuth(false)
                }
            })
            .finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Fragment>
            <Router>
                <Header/>
                <AppRouter/>
            </Router>
            <ToastContainer/>
        </Fragment>
    );
})
export default App;