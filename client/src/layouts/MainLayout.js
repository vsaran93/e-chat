import React, { Fragment } from "react";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;
