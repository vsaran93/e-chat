import React, { Fragment } from "react";

const AuthLayout = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
};

export default AuthLayout;
