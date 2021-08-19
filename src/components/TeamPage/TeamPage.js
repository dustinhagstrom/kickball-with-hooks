import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function TeamPage() {
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
  function getTeamPics() {
    axios({
      method: "get",
      url: `http://localhost:8080/api/pics/team-images`,
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    }).then(function (response) {
      setTeamPicsArray(response.data.payload[1]); //pics with all data from schema
      setTeamPlayersArray(response.data.payload[0]); //players with all data from schema
      setTeamId(response.data.payload[0][0].team[0]); //team extracted from player schema
      setTeamName(response.data.payload[2]);
    });
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

  return (
    <div>
      <div>
        <h1>Team Page</h1>
      </div>
      <div>
        <div>
          <div>insert team name here</div>
          <div>
            <div>
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
            <div>
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
