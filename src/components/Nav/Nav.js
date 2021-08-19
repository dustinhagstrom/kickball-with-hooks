import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import checkAuthCookie from "../hooks/checkAuthCookie";
import axios from "axios";

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
      Cookies.remove("jwt-cookie");
      props.history.push("/login");

      let result = await axios.get("http://localhost:8080/api/player/logout");
      console.log(result); //this should be "Logged out!" and can style for pop up.
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav className="Nav-bar">
      <div>
        <h1>
          <Link to="/">KickBallers™</Link>
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <NavLink activeClassName="selected" exact to={navLinkTitleOne}>
              <button>{navLinkDisplayOne}</button>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" exact to={navLinkTitleTwo}>
              <button>{navLinkDisplayTwo}</button>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" exact to={navLinkTitleThree}>
              <button onClick={() => logoutButton()}>
                {navLinkDisplayThree}
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
