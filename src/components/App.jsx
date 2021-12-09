//libs
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {checkAuth} from "../http/userAPI";
import {Spinner} from "react-bootstrap";
//css
import 'react-toastify/dist/ReactToastify.css';
//components
import Header from "./header/Header";
import AppRouter from "./AppRouter";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!user.isReady) {
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
}
export default App;