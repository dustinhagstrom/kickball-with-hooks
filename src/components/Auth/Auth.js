import React from "react";
import { toast, ToastContainer } from "react-toastify";

import Spinner from "../Spinner/Spinner";
import CheckAuthCookie from "../hooks/checkAuthCookie";
import userInputFields from "../hooks/userInputFields";
import useFetchApi from "../hooks/useFetchApi";

function Auth(props) {
  let isLoginRoute = props.match.path === "/login"; //if route path is login
  let buttonName = isLoginRoute ? "Login" : "Sign up";
  let apiURL = isLoginRoute ? "/player/login" : "/player/signup";

  const { checkIfCookieExists } = CheckAuthCookie();

  const [
    { isLoading, response, error, setError, setSuccessMessageValue },
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

    const user = isLoginRoute
      ? { email, password }
      : { firstName, lastName, email, username, password, confirmPassword };

    handleAPICallSubmit({
      method: "post",
      data: {
        ...user,
      },
    });
  }

  function successMessage() {
    toast("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return (
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    );
  }

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  //can change this to protected route in future if desired
  if (checkIfCookieExists()) {
    props.history.push("/profile");
  }

  return (
    <div>
      {isLoginRoute ? (
        <div>Sign in for kickball</div>
      ) : (
        <div>Sign up for kickball</div>
      )}
      <div>
        {successMessageValue && successMessage()}
        <form onSubmit={handleOnSubmit}>
          <div>
            {!isLoginRoute && (
              <>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={firstNameOnChange}
                    // onBlur={}
                    autoFocus
                  />
                  <div className="error-message">
                    {isFirstNameError && firstNameErrorMessage}
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={lastNameOnChange}
                    // onBlur={}
                    // onFocus={}
                  />
                  <div className="error-message">
                    {isLastNameError && lastNameErrorMessage}
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <div>
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={emailOnChange}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {isEmailError && emailErrorMessage}
              </div>
            </div>
          </div>
          <div>
            {!isLoginRoute && (
              <div>
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={usernameOnChange}
                  // onBlur={}
                  // onFocus={}
                />
                <div className="error-message">
                  {isUsernameError && usernameErrorMessage}
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <label>Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={passwordOnChange}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {isPasswordError && passwordErrorMessage}
              </div>
            </div>
          </div>
          <div>
            {!isLoginRoute && (
              <div>
                <label>Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={confirmPasswordOnChange}
                  // onBlur={}
                  // onFocus={}
                />
                <div className="error-message">
                  {isConfirmPasswordError && confirmPasswordErrorMessage}
                </div>
              </div>
            )}
          </div>
          <div>
            <button
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
