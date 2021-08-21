import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { TeamContext } from "../../context/TeamContext";
import { AuthContext } from "../../context/AuthContext";
import checkAuthCookie from "../hooks/checkAuthCookie";

import "./Nav.css";

function Nav(props) {
  const { logUserIn } = checkAuthCookie();

  useEffect(() => {
    //must use a ue to set user info to state. 1st render user = null;
    //2nd render user is user info from cookie.
    logUserIn(); //this reads a js cookie to get user info
  }, []);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const {
    state: { teamObject },
    dispatchTeam,
  } = useContext(TeamContext);

  const userIsLoggedIn = user ? true : false;
  const navLinkTitleOne = userIsLoggedIn ? "/profile" : "/sign-up";
  const navLinkDisplayOne = userIsLoggedIn
    ? `${user.username}'s Profile`
    : "Sign Up";
  const navLinkTitleTwo = userIsLoggedIn ? "/team" : "";
  const navLinkDisplayTwo = userIsLoggedIn ? `Your team` : "";
  const navLinkTitleThree = userIsLoggedIn ? "/login" : "/login";
  const navLinkDisplayThree = userIsLoggedIn ? `Logout` : "Login";

  const logoutButton = userIsLoggedIn ? logout : () => {};

  async function logout() {
    try {
      dispatch({
        type: "LOGOUT",
      });
      dispatchTeam({
        type: "RESET-TEAMS",
      });
      Cookies.remove("jwt-cookie");
      Cookies.remove("team-cookie");
      props.history.push("/login");

      let result = await axios.get("http://localhost:8080/api/player/logout");
      console.log(result); //this should be "Logged out!" and can style for pop up.
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav className="Nav-bar">
      <h1 className="Nav-bar__brand">
        <Link to="/">KickBallers™</Link>
      </h1>
      <div className="Nav-bar__container">
        <ul
          className="Nav-bar__items"
          //  style={{ listStyle: "none" }}
        >
          <li className="Nav-bar__item">
            <NavLink activeClassName="selected" exact to={navLinkTitleOne}>
              {navLinkDisplayOne}
            </NavLink>
          </li>
          <li className="Nav-bar__item">
            <NavLink activeClassName="selected" exact to={navLinkTitleTwo}>
              {navLinkDisplayTwo}
            </NavLink>
          </li>
          <li className="Nav-bar__item">
            <NavLink
              activeClassName="selected"
              exact
              to={navLinkTitleThree}
              onClick={() => logoutButton()}
            >
              {navLinkDisplayThree}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
