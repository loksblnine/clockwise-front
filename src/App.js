//libs
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {check} from "./http/userAPI";
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

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check()
            .then(() => {
                user.setUser(true)
                user.setIsAuth(!!localStorage.getItem('token'))
            })
            .finally(() => setLoading(false))
    }, [])

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