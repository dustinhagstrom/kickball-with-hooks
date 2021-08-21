import jwtDecode from "jwt-decode";
import Cookies from "js-cookie"; //bring in Cookies from module
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function CheckAuthCookie() {
  const { dispatch } = useContext(AuthContext);
  function checkIfCookieExists() {
    const cookie = Cookies.get("jwt-cookie"); //grab the cookie named "jwt-cookie"

    //if there is a cookie then return true.
    if (cookie) {
      return true;
    } else {
      return null;
    }
  }

  function logUserIn() {
    let doesCookieExist = checkIfCookieExists(); //if the return on this func is true then there is a user cookie, else null.
    if (doesCookieExist) {
      const cookie = Cookies.get("jwt-cookie"); //read the cookie named "jwt-cookie" and assign const name
      const jwtDecodedCookie = jwtDecode(cookie); //decode the cookie
      //the dispatch here makes an action obj
      console.log(jwtDecodedCookie.isTeamCaptain);
      dispatch({
        type: "LOGIN",
        user: {
          email: jwtDecodedCookie.email,
          username: jwtDecodedCookie.username,
        },
      });
    }
  }

  return {
    checkIfCookieExists, //for use in Auth component
    logUserIn, //for use in nav component
  };
}

export default CheckAuthCookie;
