import React, {useCallback, useEffect, useState} from 'react';
import {COLLAPSE_ARROWS, EXPAND_ARROWS, PDF_SVG, STAR} from "../../../utils/svg_constants";
import {Spinner} from "react-bootstrap";
import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../store/actions/orderActions";
import {deleteMasterCity, setUserData} from "../../../store/actions/userActions";
import {setCities} from "../../../store/actions/cityActions";
import {approveOrder} from "../../../store/actions/masterActions";
import AddCity from "./AddCity";
import EditProfileMaster from "./EditProfileMaster";
import PaymentDetails from "../customer-content/Payment/PaymentDetails";
import {savePDFile} from "../../../utils/utils";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";

import ListOrders from "./orders/ListOrders";
import Profile from "./edit/Profile";
import Calendar from "./calendar/Calendar";
import WeekDisplay from "./calendar/WeekDisplay";
import {setUserData} from "../../../store/actions/userActions";


const MasterPanel = () => {
    const inputRef = React.useRef(null)
    const dispatch = useDispatch()
    const email = useSelector((state) => state.users.user.email)
    const master = useSelector((state) => state.users.data?.master)

    useEffect(() => {
        if (!master?.master_id)
            dispatch(setUserData("masters", email))
        inputRef.current.click()
    }, [])
    return (
        <Router>
            <div>
                <h2>Администрирование</h2>
                <LinkContainer to='/profile'>
                    <button className="btn btn-xl" id="btn-orders" ref={inputRef}>Профиль</button>
                </LinkContainer>
                <LinkContainer to='/orders'>
                    <button className="btn btn-xl" id="btn-orders">Заказы</button>
                </LinkContainer>
                <LinkContainer to='/calendar'>
                    <button className="btn btn-xl" id="btn-orders">Календарь</button>
                </LinkContainer>
            </div>
            <Switch>
                <Route exact path='/orders' component={ListOrders}/>
                <Route exact path='/calendar' component={Calendar}/>
                <Route exact path='/calendar/weekly' component={WeekDisplay}/>
                <Route exact path='/profile' component={Profile}/>
            </Switch>
        </Router>
    )
}

export default withRouter(MasterPanel);
