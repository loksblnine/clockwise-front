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
    const letItSnow = useSelector((state) => state.weather.letItSnow)
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isUserReady) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div>
            <div className="content">
                {letItSnow && <Snowfall snowflakeCount={450}
                />}
                <Router>
                    <Header/>
                    <AppRouter/>
                </Router>
            </div>
            <Footer/>
            <ToastContainer/>
        </div>
    );
}
export default App;
