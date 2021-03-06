import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
//components
import ListMasters from "../masters/ListMasters";
import ListCities from "../cities/ListCities";
import ListCustomers from "../customers/ListCustomers";
import ListOrders from "../orders/ListOrders";
import CreateArticle from "../blog/CreateArticle";
import ListTypes from "../types/ListTypes";
import ChartMenu from "../charts/ChartMenu";
const AdminPanel = () => {
    const inputRef = React.useRef(null)

    useEffect(() => {
        inputRef.current.click()
    }, []);

    return (
        <div>
            <Router>
                <div>
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
                        <button className="btn btn-xl" id="btn-orders" >Заказы</button>
                    </LinkContainer>
                    <LinkContainer to='/blog/create'>
                        <button className="btn btn-xl">Создать статью</button>
                    </LinkContainer>
                    <LinkContainer to='/types'>
                        <button className="btn btn-xl">Услуги</button>
                    </LinkContainer>
                    <LinkContainer to='/charts'>
                        <button className="btn btn-xl" ref={inputRef}>Диаграммы</button>
                    </LinkContainer>
                </div>
                <Switch>
                    <Route exact path='/masters' component={ListMasters}/>
                    <Route exact path='/cities' component={ListCities}/>
                    <Route exact path='/customers' component={ListCustomers}/>
                    <Route exact path='/orders' component={ListOrders}/>
                    <Route exact path='/blog/create' component={CreateArticle}/>
                    <Route exact path='/types' component={ListTypes}/>
                    <Route exact path='/charts' component={ChartMenu}/>
                </Switch>
            </Router>
        </div>
    );
}

export default AdminPanel;
