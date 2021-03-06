import React, { useState } from "react";
import Axios from "../../Axios";

import "./Home.css";

function Home() {
  const [emailSub, setEmailSub] = useState("");

  function handleSubscribeSubmit() {
    Axios({
      method: "post",
      url: "/mail/send-practice-email",
      data: {
        emailInput: emailSub,
      },
    }).then(function (res) {
      console.log(res);
    });
  }

  function handleEmailSubscriptionInputOnChange(e) {
    setEmailSub(e.target.value);
  }
  return (
    <div>
      <section className="Home-body">
        <div className="background-image"></div>
        <div className="landing-hook">
          <h1 className="landing-hook__title"> Join Our Mailing List!</h1>
          <h3 className="landing-hook__subtitle">
            Keep up to date with what we are doing
          </h3>
          <p className="landing-hook__info">
            Get an Idea of what we are all about
          </p>
          <form onSubmit={handleSubscribeSubmit}>
            <label htmlFor="email-input">
              <input
                name="email-input"
                className="subscribe-input form-inline"
                onChange={handleEmailSubscriptionInputOnChange}
                placeholder="* Your email here"
              ></input>
            </label>
            <div className="form-inline">
              <button type="submit" className="subscribe-button">
                Submit
              </button>
            </div>
            <div className="disclaimer">
              * by submitting, you agree to KickBallers™ terms of use
            </div>
          </form>
        </div>
      </section>
      <nav className="main-footer">
        <ul className="main-footer__links">
          <li
            className="main-footer__link"
            onClick={() => alert("I support you!")}
          >
            Support
          </li>
          <li
            className="main-footer__link"
            onClick={() =>
              alert(
                "I hope you wore a hard hat because this area is still under construction!"
              )
            }
          >
            Terms of Use
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
