import React from "react";
import { Redirect, Route } from "react-router-dom";

import CheckAuthCookie from "../hooks/checkAuthCookie";

function PrivateRoute({ component: Component, ...rest }) {
  const { checkIfCookieExists } = CheckAuthCookie();

  return (
    <Route
      {...rest}
      render={(props) =>
        checkIfCookieExists() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
