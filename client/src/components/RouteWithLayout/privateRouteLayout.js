import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteLayout = ({
  layout: Layout,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Layout {...rest}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRouteLayout;