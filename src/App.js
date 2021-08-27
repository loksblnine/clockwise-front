//libs
import React, {Fragment, useContext} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

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
import ListCities from "./components/content/admin-content/cities/ListCities";
import ListCustomers from "./components/content/admin-content/customers/ListCustomers";
import ListMasters from "./components/content/admin-content/masters/ListMasters";
import ListOrders from "./components/content/admin-content/orders/ListOrders";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";


const App = () => {
    return (
        <Fragment>
            <Router>
                <Header/>
                <AppRouter/>
                {/*<Footer/>*/}
            </Router>

        </Fragment>
    );
}
export default App;