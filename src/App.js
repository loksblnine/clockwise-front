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
import ListCities from "./components/content/admin-content/cities/ListCities";
import ListCustomers from "./components/content/admin-content/customers/ListCustomers";
import ListMasters from "./components/content/admin-content/masters/ListMasters";
import ListOrders from "./components/content/admin-content/orders/ListOrders";

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
                    <Route exact path='/masters_choosing'> <MasterView/> </Route>
                    <Route exact path='/cities'><ListCities/></Route>
                    <Route exact path='/orders'><ListOrders/></Route>
                    <Route exact path='/masters'><ListMasters/></Route>
                    <Route exact path='/customers'><ListCustomers/></Route>
                </Switch>
                {/*<Footer/>*/}
            </Router>

        </Fragment>
    );
}
export default App;