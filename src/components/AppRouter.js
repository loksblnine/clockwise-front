import React from 'react';
import {Route, Switch} from "react-router-dom";
import {authAdminRoutes, authMasterRoutes, customerRoutes, authClientRoutes} from "../utils/constants";
import NotFound from "../http/NotFound";
import {useSelector} from "react-redux";
import Blog from "./content/customer-content/Blog/Blog";

const AppRouter = () => {
    const role = useSelector(state => state.users.user.role)

    return (
        <Switch>
            {role === 1 && authAdminRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {role === 2 && authMasterRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {role === 3 && authClientRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {customerRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            <Route path="/blog/*" component={Blog}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default AppRouter;
