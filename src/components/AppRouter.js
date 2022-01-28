import React from 'react';
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";

import NotFound from "../http/NotFound";
import Blog from "./content/customer-content/Blog/Blog";
import {authAdminRoutes, authMasterRoutes, customerRoutes, authClientRoutes} from "../utils/constants";

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
