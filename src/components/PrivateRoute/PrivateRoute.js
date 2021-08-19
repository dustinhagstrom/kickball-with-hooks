import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import CheckAuthCookie from "../hooks/checkAuthCookie";

function PrivateRoute({ component: Component, ...rest }) {
  const { logUserIn } = CheckAuthCookie;
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
