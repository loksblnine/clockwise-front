//libs
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {checkAuth} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import axios from "axios";
//css
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./components/header/Header";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import jwt_decode from "jwt-decode";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    useEffect(() => {
        sessionStorage.setItem('pageOrderList', 0)
        if (!!localStorage.getItem('token')) {
            checkAuth()
                .then(data => {
                    if (data.status === 200) {
                        user.setUser(jwt_decode(localStorage.getItem('token')).role)
                        user.setIsAuth(true)
                    } else {
                        localStorage.removeItem('token')
                        user.setUser({})
                        user.setIsAuth(false)
                    }
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
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