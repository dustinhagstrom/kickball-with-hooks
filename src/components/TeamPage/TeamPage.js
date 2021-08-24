import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Redirect } from "react-router";

import { AuthContext } from "../../context/AuthContext";

function TeamPage(props) {
  const baseURL =
    process.env.NODE_ENV === //react already has this node env variable established.
    "development"
      ? "http://localhost:8080/api"
      : "DEPLOYED LOCATION";
  const [teamPicsArray, setTeamPicsArray] = useState([]);
  const [teamPlayersArray, setTeamPlayersArray] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");
  const cookie = Cookies.get("jwt-cookie");
  const jwtDecodedCookie = jwtDecode(cookie);
  const {
    state: { user },
  } = useContext(AuthContext);
  function getTeamPics() {
    if (jwtDecodedCookie.isOnATeam || Cookies.get("team-cookie")) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/pics/team-images`,
        headers: {
          authorization: `Bearer ${cookie}`,
        },
      }).then(function (res) {
        console.log(res.data.payload);
        setTeamPicsArray(res.data.payload[1]); //pics with all data from schema
        setTeamPlayersArray(res.data.payload[0]); //players with all data from schema
        setTeamId(res.data.payload[0][0].team[0]); //team extracted from player schema
        setTeamName(res.data.payload[2]);
      });
    }
  }

  useEffect(() => {
    getTeamPics();
  }, []);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  if (!jwtDecodedCookie.isOnATeam) {
    if (!Cookies.get("team-cookie")) {
      return <Redirect to="/welcome" />;
    }
  }

  return (
    <div className="body">
      <div className="team-page__title">
        <h1>Team Page</h1>
      </div>
      <div>
        <div className="team-page">
          <div className="team-page__name">{teamName}</div>
          <div>
            <div className="team-page__roster-images">
              {teamPicsArray &&
                teamPicsArray.map((pic, index) => {
                  let myPic = arrayBufferToBase64(pic.data.data);
                  let myFinalPic = `data:image/png;base64,${myPic}`;
                  return (
                    <div key={index}>
                      <img
                        style={{ width: "75px" }}
                        src={myFinalPic}
                        alt="profile-pic"
                      />
                    </div>
                  );
                })}
            </div>
            <div className="team-page__roster-names">
              {teamPlayersArray.map((player) => {
                return (
                  <div
                    style={{
                      height: "75px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={player._id}
                  >
                    <div>{player.firstName}</div>
                    <div>{player.lastName}</div>
                  </div>
                );
              })}
              {/* insert pagination */}
            </div>
            <div className="team-page__remove-team">
              <button>Quit Your Team</button>
            </div>
          </div>
        </div>
        <div className="schedule-stats-container">
          <div className="schedule">schedule</div>
          <div className="stats">stats</div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
