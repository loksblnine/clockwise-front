//libs
import React, {Fragment, useContext} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import * as constants from "./constants"

//css
import './App.css';

//components
import Header from "./components/header/Header";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";


const App = observer(() => {
    const {user} = useContext(Context)
    return (
        <Fragment>
            <Router>
                <Header/>
                <AppRouter/>
                {/*<Footer/>*/}
            </Router>

        </Fragment>
    );
})
export default App;