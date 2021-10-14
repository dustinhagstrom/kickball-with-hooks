import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import Axios from "../../Axios";

import { TeamContext } from "../../context/TeamContext";
import { AuthContext } from "../../context/AuthContext";
import { PicContext } from "../../context/PicContext";
import checkAuthCookie from "../hooks/checkAuthCookie";

import "./Nav.css";

function Nav(props) {
  const [navProfileImg, setNavProfileImg] = useState(undefined);

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

  const {
    state: { picObject },
  } = useContext(PicContext);

  const cookie = Cookies.get("jwt-cookie");

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

      let result = await Axios.get("/player/logout");
      console.log(result); //this should be "Logged out!" and can style for pop up.
    } catch (e) {
      console.log(e);
    }
  }

  function arrayBufferToBase64(buffer) {
    //convert the buffer to base64
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  console.log(user);
  function handleGetPic() {
    if (cookie) {
      Axios({
        method: "get",
        url: "/pics/player-image",
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }).then(function (res) {
        console.log("1");
        let OurPic = arrayBufferToBase64(res.data.payload.img.data.data);
        console.log(OurPic);
        console.log("2");
        let ourPicSrc = `data:image/png;base64,${OurPic}`;
        console.log(ourPicSrc);
        console.log("3");

        setNavProfileImg(ourPicSrc);
        console.log(navProfileImg);
      });
    }
  }

  useEffect(() => {
    handleGetPic();
  }, [picObject]);

  return (
    <nav className="Nav-bar">
      <h1 className="Nav-bar__brand vert-align">
        <Link to="/">KickBallers™</Link>
      </h1>
      <div className="Nav-bar__container">
        <ul className="Nav-bar__items">
          <li className="Nav-bar__item">
            {userIsLoggedIn ? (
              <img
                id="Nav-bar__pic"
                className="vert-align"
                src={navProfileImg}
                alt="profile-pic"
              />
            ) : (
              ""
            )}
          </li>
          <li className="Nav-bar__item">
            <NavLink
              activeClassName="selected"
              className="vert-align"
              exact
              to={navLinkTitleOne}
            >
              {navLinkDisplayOne}
            </NavLink>
          </li>
          <li className="Nav-bar__item">
            <NavLink
              activeClassName="selected"
              className="vert-align"
              exact
              to={navLinkTitleTwo}
            >
              {navLinkDisplayTwo}
            </NavLink>
          </li>
          <li className="Nav-bar__item">
            <NavLink
              activeClassName="selected"
              className="vert-align"
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
