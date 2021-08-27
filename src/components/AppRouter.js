import React, {useContext} from 'react';
import {Route, Switch} from "react-router-dom";
import {Context} from "../index";
import {authRoutes, customerRoutes} from "../constants";
import {observer} from "mobx-react-lite";

const AppRouter = observer((props) => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} exact/>
            )}
            {customerRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} exact/>
            )}
        </Switch>
    );
})

export default AppRouter;