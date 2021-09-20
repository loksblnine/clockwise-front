import React, {useContext} from 'react';
import {Route, Switch} from "react-router-dom";
import {Context} from "../index";
import {authRoutes, customerRoutes} from "../constants";
import {observer} from "mobx-react-lite";
import NotFound from "../http/NotFound";

const AppRouter = observer((props) => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {customerRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            <Route path="*" component={NotFound} />
        </Switch>
    );
})

export default AppRouter;