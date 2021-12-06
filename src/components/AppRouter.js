import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import {authAdminRoutes, authMasterRoutes, customerRoutes, authClientRoutes} from "../constants";
import NotFound from "../http/NotFound";
import {useDispatch, useSelector} from "react-redux";

const AppRouter = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)

    useEffect(() => {
    }, [dispatch])

    return (
        <Switch>
            {user.role === 1 && authAdminRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {user.role === 2 && authMasterRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {user.role === 3 && authClientRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            {customerRoutes.map(({path, Component}) =>
                <Route path={path} component={Component} key={path} exact/>
            )}
            <Route path="*" component={NotFound}/>
        </Switch>
    );
}

export default AppRouter;