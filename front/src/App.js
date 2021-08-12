//libs
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as constants from "./constants"
//css
import './App.css';

//components
import AdminPanel from "./components/content/admin-content/login-form/AdminPanel";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import OrderForm from "./components/content/customer-content/orderform/OrderForm";
import MasterView from "./components/content/customer-content/mastersview/MasterView";
import LoginForm from "./components/content/admin-content/login-form/LoginForm";


function requireOrder(nextState, replace, next) {
    if (constants.IS_ORDER_SUBMITTED.is) {
        replace({
            pathname: "/",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

const App = () => {
    return (
        <Fragment>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' component={OrderForm}/>
                    <Route exact path='/choose_master' component={MasterView}/>
                    <Route exact path='/login' component={LoginForm}/>
                    <Route exact path='/access_succeed' component={AdminPanel}/>
                    <Route exact path='/masters_choosing' onEnter={requireOrder}> <MasterView/> </Route>
                </Switch>
                {/*<Footer/>*/}
            </Router>

        </Fragment>
    );
}
export default App;