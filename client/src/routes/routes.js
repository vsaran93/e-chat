import React from "react";
import { Switch, Redirect } from "react-router-dom";

import RouteWithLayout from "../components/RouteWithLayout";
import PrivateRouteLayout from '../components/RouteWithLayout/privateRouteLayout';
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import Home from "../components/Home/Home";

const Routes = (props) => {
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
      <PrivateRouteLayout
        component={Home}
        exact
        layout={MainLayout}
        path="/home"
        {...props}
      />
    </Switch>
  );
};

export default Routes;
