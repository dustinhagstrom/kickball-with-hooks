import React from "react";

import "./Welcome.css";

function Welcome() {
  return (
    <section>
      <h1 className="section-title">Choose how you wanna play</h1>
      <div>
        <article className="plan plan--highlighted">
          <h1 className="plan__annotation">RECOMMENDED</h1>
          <h1>Kickballers</h1>
          <h2>$59/season</h2>
          <ul className="plan__infos">
            <li className="plan__info">Easiest way to play</li>
            <li className="plan__info">Uniform shirt included</li>
            <li className="plan__info">Captains will teach you</li>
            <li className="plan__info">20+ games/season</li>
          </ul>
        </article>
        <article className="plan">
          <h1>Co-Captains</h1>
          <h2>$39/season</h2>
          <ul className="plan__infos">
            <li className="plan__info">Assist team captains</li>
            <li className="plan__info">Additional Captain Meetups</li>
            <li className="plan__info">Teach others to play</li>
            <li className="plan__info">20+ games/season</li>
          </ul>
        </article>
        <article className="plan">
          <h1>Kickballin' Pro</h1>
          <h2>$19/season</h2>
          <ul className="plan__infos">
            <li className="plan__info">Make and fill your team</li>
            <li className="plan__info">Additional Captain Meetups</li>
            <li className="plan__info">Control Team Direction</li>
            <li className="plan__info">20+ games/season</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Welcome;
