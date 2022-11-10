import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {GuestRoutes, AdminRoutes, ManagerRoutes, DoctorRoutes} from "./Utils/Routes";
import Loading from "./Layouts/Loading/Loading";

const AppRouter = () => {
    const role = useSelector((state) => state.userReducer.user.role);
    const isReady = useSelector((state) => state.userReducer.isReady);

    if (!isReady) {
        return (
            <Loading/>
        );
    }

    return (
        <Routes>
            {GuestRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path}/>
            )}
            {role === 1 && AdminRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path}/>
            )}
            {role === 2 && ManagerRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path}/>
            )}
            {role === 3 && DoctorRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} key={path}/>
            )}
            <Route
                path="*"
                element={<Navigate to="/login" replace/>}
            />
        </Routes>
    );
};

export default AppRouter;