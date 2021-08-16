import React from "react";

function Login() {
  return (
    <div>
      <div>Login</div>
      <div>
        <form>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                // id="email"
                name="email"
                // value={}
                placeholder="Email"
                autoFocus
                // onChange={}
                // onBlur={}
              />
              {/* <div>{emailError && emailError}</div> */}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                // id="password"
                name="password"
                // value={}
                placeholder="Password"
                // onFocus={}
                // onChange={}
                // onBlur={}
              />
              {/* <div>{passwordError && passwordError}</div> */}
            </div>
          </div>
          <div>
            <button
              type="submit"
              // disabled={isButtonDisabled}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
