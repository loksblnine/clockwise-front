import React from "react";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";

import {GuestRoutes, ManagerRoutes, DoctorRoutes} from "./Utils/Routes";

const AppRouter = () => {
  const role = useSelector((state) => state.userReducer.user.role);
  const isReady = useSelector((state) => state.userReducer.isReady);
  if (!isReady) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <Routes>
      {GuestRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      {role === 3 && DoctorRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
      {role === 2 && ManagerRoutes.map(({path, Component}) =>
        <Route path={path} element={Component} key={path}/>
      )}
    </Routes>
  );
};

export default AppRouter;