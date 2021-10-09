//libs
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {checkAuth} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
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
import axios from "axios";
import {SERVER_URL} from "./constants";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!!localStorage.getItem('token')) {
            checkAuth()
                .then(data => {
                    if (data.status === 200) {
                        user.setUser(jwt_decode(localStorage.getItem('token')).role)
                        user.setIsAuth(true)
                        // cities.setCities(axios.get(SERVER_URL+`/cities`))
                    } else {
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