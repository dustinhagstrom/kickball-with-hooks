import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
// import TeamPage from "./components/TeamPage/TeamPage";
// import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import NotFound from "./components/NotFound/NotFound";
// import Auth from "./components/Auth/Auth";
import Welcome from "./components/Welcome/Welcome";

const TeamPage = React.lazy(() => import("./components/TeamPage/TeamPage"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
// const Welcome = React.lazy(() => import("./components/Welcome/Welcome"));

function MainRouter() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/sign-up" component={Auth} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/logout" render={() => <Redirect to="/login" />} />
        <PrivateRoute exact path="/team" component={TeamPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/welcome" component={Welcome} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default MainRouter;
