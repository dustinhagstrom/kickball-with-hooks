import React, { useContext } from "react";
import Cookies from "js-cookie";

import Spinner from "../Spinner/Spinner";
import CheckAuthCookie from "../hooks/checkAuthCookie";
import userInputFields from "../hooks/userInputFields";
import useFetchApi from "../hooks/useFetchApi";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import jwtDecode from "jwt-decode";

import "./Auth.css";

function Auth(props) {
  let isLoginRoute = props.match.path === "/login"; //if route path is login
  let buttonName = isLoginRoute ? "Login" : "Sign up";
  let apiURL = isLoginRoute ? "/player/login" : "/player/signup";

  const { checkIfCookieExists } = CheckAuthCookie();

  const {
    state: { user },
  } = useContext(AuthContext);

  const [
    {
      isLoading,
      response,
      setResponse,
      error,
      setError,
      setSuccessMessageValue,
    },
    handleAPICallSubmit,
    successMessageValue,
  ] = useFetchApi(apiURL);

  const [
    firstName,
    firstNameOnChange,
    isFirstNameError,
    firstNameErrorMessage,
    firstNameIsDisabled,
    clearFirstNameInput,
  ] = userInputFields("firstName");
  const [
    lastName,
    lastNameOnChange,
    isLastNameError,
    lastNameErrorMessage,
    lastNameIsDisabled,
    clearLastNameInput,
  ] = userInputFields("lastName");
  const [
    email,
    emailOnChange,
    isEmailError,
    emailErrorMessage,
    emailIsDisabled,
    clearEmailInput,
  ] = userInputFields("email");
  const [
    username,
    usernameOnChange,
    isUsernameError,
    usernameErrorMessage,
    usernameIsDisabled,
    clearUsernameInput,
  ] = userInputFields("username");
  const [
    password,
    passwordOnChange,
    isPasswordError,
    passwordErrorMessage,
    passwordIsDisabled,
    clearPasswordInput,
  ] = userInputFields("password");
  const [
    confirmPassword,
    confirmPasswordOnChange,
    isConfirmPasswordError,
    confirmPasswordErrorMessage,
    confirmPasswordIsDisabled,
    clearConfirmPasswordInput,
  ] = userInputFields("confirmPassword");

  function handleOnSubmit(e) {
    e.preventDefault();

    const userInput = isLoginRoute
      ? { email, password }
      : { firstName, lastName, email, username, password, confirmPassword };

    handleAPICallSubmit({
      method: "post",
      data: {
        ...userInput,
      },
    });
  }

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  // function handlesLoginReturnsCurrentCookie() {} //the goal is to export this func to get new cookie when anything in user context changes.

  if (response === "user created") {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    clearFirstNameInput();
    clearLastNameInput();
    clearConfirmPasswordInput();
    pushToLogin();
  }

  async function pushToLogin() {
    //must use async to prevent .push from trying to change component during render.
    try {
      await setResponse(null);
      props.history.push("/login");
    } catch (e) {
      console.log(e);
    }
  }

  //can change this to protected route in future if desired
  if (checkIfCookieExists()) {
    //bring in and decode the cookie b/c setting user state is asynch and takes longer to set and read then this takes to read.
    console.log("here's a cookie");
    const cookie = Cookies.get("jwt-cookie");
    const jwtDecodedCookie = jwtDecode(cookie);
    return jwtDecodedCookie.isOnATeam ? (
      <Redirect to="/team" />
    ) : (
      <Redirect to="/welcome" />
    );
  }

  return (
    <div className="auth-wrap">
      {isLoginRoute ? (
        <div className="form-auth__title">Sign in for kickball</div>
      ) : (
        <div className="form-auth__title">Sign up for kickball</div>
      )}
      {/* {successMessageValue && successMessage()} */}
      <div className="form-wrap">
        <form className="form-auth" onSubmit={handleOnSubmit}>
          <div className="form-auth__inlines">
            {!isLoginRoute && (
              <>
                <div className="form-auth__inline">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={firstNameOnChange}
                    autoFocus
                  />
                  <div className="error-message">
                    {isFirstNameError && firstNameErrorMessage}
                  </div>
                </div>
                <div className="form-auth__inline">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={lastNameOnChange}
                  />
                  <div className="error-message">
                    {isLastNameError && lastNameErrorMessage}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="form-auth__blocks">
            <div className="form-auth__block">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={emailOnChange}
              />
              <div className="error-message">
                {isEmailError && emailErrorMessage}
              </div>
            </div>
          </div>
          <div className="form-auth__blocks">
            {!isLoginRoute && (
              <div className="form-auth__block">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={usernameOnChange}
                />
                <div className="error-message">
                  {isUsernameError && usernameErrorMessage}
                </div>
              </div>
            )}
          </div>
          <div className="form-auth__blocks">
            <div className="form-auth__block">
              <label>Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={passwordOnChange}
              />
              <div className="error-message">
                {isPasswordError && passwordErrorMessage}
              </div>
            </div>
          </div>
          <div className="form-auth__blocks">
            {!isLoginRoute && (
              <div className="form-auth__block">
                <label>Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={confirmPasswordOnChange}
                />
                <div className="error-message">
                  {isConfirmPasswordError && confirmPasswordErrorMessage}
                </div>
              </div>
            )}
          </div>
          <div className="button-div">
            <button
              className="form-button"
              type="submit"
              disabled={
                isLoginRoute
                  ? emailIsDisabled || passwordIsDisabled
                  : emailIsDisabled ||
                    passwordIsDisabled ||
                    confirmPasswordIsDisabled ||
                    usernameIsDisabled ||
                    firstNameIsDisabled ||
                    lastNameIsDisabled
              }
            >
              {buttonName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
