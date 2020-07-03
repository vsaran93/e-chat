import React from "react";
import { Switch, Redirect } from "react-router-dom";

import RouteWithLayout from "../components/RouteWithLayout";
import AuthLayout from "../layouts/AuthLayout";

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/sign-in" />
      <RouteWithLayout
        component={Register}
        exact
        layout={AuthLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={AuthLayout}
        path="/sign-in"
      />
    </Switch>
  );
};

export default Routes;
