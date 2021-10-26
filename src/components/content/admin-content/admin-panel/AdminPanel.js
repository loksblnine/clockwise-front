import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Button from "@material-ui/core/Button"
import {LinkContainer} from 'react-router-bootstrap'
import './AdminPanel.css'
import {observer} from "mobx-react-lite";

//components
import ListMasters from "../masters/ListMasters";
import ListCities from "../cities/ListCities";
import ListCustomers from "../customers/ListCustomers";
import ListOrders from "../orders/ListOrders";
import {Context} from "../../../../index";
import axios from "axios";
import {SERVER_URL} from "../../../../constants";

const AdminPanel = observer(() => {
    const {DB} = useContext(Context)
    useEffect(() => {
        axios.get(SERVER_URL + `/cities`)
            .then(resp => DB.setCities(resp.data))
        axios.get(SERVER_URL + `/customers`)
            .then(resp => DB.setCustomers(resp.data))
        axios.get(SERVER_URL + `/masters`)
            .then(resp => DB.setMasters(resp.data))
        axios.get(SERVER_URL + `/orders`)
            .then(resp => DB.setOrders(resp.data))
    }, []);

    return (
        <Router>
            <div className="router">
                <h2>Администрирование</h2>

                <LinkContainer to='/masters'>
                    <Button className="btn btn-xl">Мастера</Button>
                </LinkContainer>
                <LinkContainer to='/cities'>
                    <Button className="btn btn-xl ">Города</Button>
                </LinkContainer>
                <LinkContainer to='/customers'>
                    <Button className="btn btn-xl">Покупатели</Button>
                </LinkContainer>
                <LinkContainer to='/orders'>
                    <Button className="btn btn-xl" id={`btn-orders`}>Заказы</Button>
                </LinkContainer>
                <Switch>
                    <Route exact path='/masters' component={ListMasters}/>
                    <Route exact path='/cities' component={ListCities}/>
                    <Route exact path='/customers' component={ListCustomers}/>
                    <Route exact path='/orders' component={ListOrders}/>
                </Switch>
            </div>
        </Router>
    );
})

export default AdminPanel;