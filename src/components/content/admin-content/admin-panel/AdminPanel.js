import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import '../../Panel.css'

//components
import ListMasters from "../masters/ListMasters";
import ListCities from "../cities/ListCities";
import ListCustomers from "../customers/ListCustomers";
import ListOrders from "../orders/ListOrders";

const AdminPanel = () => {
    const inputRef = React.useRef(null)
    useEffect(() => {
        inputRef.current.click()
    }, []);

    return (
        <Router>
            <div>
            <div className="router">
                <h2>Администрирование</h2>
                <LinkContainer to='/masters'>
                    <button className="btn btn-xl">Мастера</button>
                </LinkContainer>
                <LinkContainer to='/cities'>
                    <button className="btn btn-xl ">Города</button>
                </LinkContainer>
                <LinkContainer to='/customers'>
                    <button className="btn btn-xl">Покупатели</button>
                </LinkContainer>
                <LinkContainer to='/orders'>
                    <button className="btn btn-xl" id="btn-orders" ref={inputRef}>Заказы</button>
                </LinkContainer>
                </div>
                <Switch>
                    <Route exact path='/masters' component={ListMasters}/>
                    <Route exact path='/cities' component={ListCities}/>
                    <Route exact path='/customers' component={ListCustomers}/>
                    <Route exact path='/orders' component={ListOrders}/>
                </Switch>
            </div>
        </Router>
    );
}

export default AdminPanel;