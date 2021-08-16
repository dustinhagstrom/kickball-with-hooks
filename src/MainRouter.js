import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import TeamPage from "./components/TeamPage/TeamPage";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

function MainRouter() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" render={() => <Redirect to="/login" />} />
        <PrivateRoute exact path="/team" component={TeamPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default MainRouter;
