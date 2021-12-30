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
    const user = useSelector(state => state.users)
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!user.isReady) {
        return <Spinner animation={"grow"}/>
    }
const styles = {
    "clear": "both",
    "position": "relative",
    "height": "100%",
    "margin-top": "0px",
    "width":"99,99%",
    "background":"rgba(179,255,246,0.25)"
}
    return (
        <div style={styles} >
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
