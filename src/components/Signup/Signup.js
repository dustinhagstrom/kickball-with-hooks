import React from "react";

function Signup() {
  return (
    <div>
      <div>Sign up for kickball</div>
      <div>
        <form
        // onSubmit={}
        >
          <div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                // id="firstName"
                name="firstName"
                placeholder="First name"
                // value={}
                // onChange={}
                // onBlur={}
                autoFocus
              />
              <div className="error-message">
                {/* {firstNameError && firstNameError} */}
              </div>
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                // id="lastName"
                name="lastName"
                placeholder="Last name"
                // value={}
                // onChange={}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {/* {lastNameError && lastNameError} */}
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                // value={}
                // onChange={}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {/* {emailError && emailError} */}
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                // value={}
                // onChange={}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {/* {usernameError && usernameError} */}
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Password</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Password"
                // value={}
                // onChange={}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {/* {passwordError && passwordError} */}
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Confirm Password</label>
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                // value={}
                // onChange={}
                // onBlur={}
                // onFocus={}
              />
              <div className="error-message">
                {/* {confirmPasswordError && confirmPasswordError} */}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              // disabled={}
            >
              Sign me Up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
