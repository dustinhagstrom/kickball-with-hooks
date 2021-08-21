import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "./Welcome.css";

import { AuthContext } from "../../context/AuthContext";
import { TeamContext } from "../../context/TeamContext";

function Welcome(props) {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const {
    state: { teamObject },
    dispatchTeam,
  } = useContext(TeamContext);

  const cookie = Cookies.get("jwt-cookie");

  function getTeamList() {
    axios({
      method: "get",
      url: "http://localhost:8080/api/team/get-team-list",
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    }).then(function (res) {
      console.log(res.data.payload);
      dispatchTeam({
        type: "SET-TEAMS",
        teamObject: {
          teamArray: res.data.payload,
        },
      });
    });
  }

  useEffect(() => {
    getTeamList();
  }, []);

  function handleOnClickBasicPlan() {
    console.log("click");
    let randomIndex = Math.floor(Math.random() * teamObject.teamArray.length);
    let randomTeam = teamObject.teamArray[randomIndex];
    axios({
      method: "put",
      url: "http://localhost:8080/api/team/join-team",
      data: {
        teamName: randomTeam,
        email: user.email,
      },
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    }).then(function (res) {
      console.log(res.data.isOnATeam);
      Cookies.set("team-cookie", res.data.isOnATeam);
      props.history.push("/team");
    });
    //puts you on a random team by going through teamArray in context
    //calls the server for the
  }

  function handleOnClickAssistPlan() {
    console.log("click");
    //puts you on a random team.
  }

  function handleOnClickCaptainPlan() {
    console.log("click");
    //puts you on a random team.
  }

  if (Cookies.get("team-cookie")) {
    //this if combo prevents value of null from breaking app
    return <Redirect to="/profile" />;
  }
  return (
    <section className="disable-select">
      <h1 className="section-title">How Do You Wanna Ball???</h1>
      <div>
        <article
          className="plan plan--highlighted"
          onClick={handleOnClickBasicPlan}
        >
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
        <article className="plan" onClick={handleOnClickAssistPlan}>
          <h1>Co-Captains</h1>
          <h2>$39/season</h2>
          <ul className="plan__infos">
            <li className="plan__info">Assist team captains</li>
            <li className="plan__info">Additional Captain Meetups</li>
            <li className="plan__info">Teach others to play</li>
            <li className="plan__info">20+ games/season</li>
          </ul>
        </article>
        <article className="plan" onClick={handleOnClickCaptainPlan}>
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
