//libs
import React, {useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {checkAuth} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
import Snowfall from 'react-snowfall'
//css
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./header/Header";
import AppRouter from "./AppRouter";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import Footer from "./footer/Footer";

const App = () => {
    const dispatch = useDispatch()
    const isUserReady = useSelector(state => state.users.isReady)
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isUserReady) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div>
            <Snowfall snowflakeCount={450}
            />
            <Router>
                <Header/>
                <AppRouter/>
            </Router>
            <ToastContainer/>
            <Footer/>
        </div>
    );
}
export default App;
