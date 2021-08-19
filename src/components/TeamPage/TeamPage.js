import React from "react";

function TeamPage() {
  // const [
  //   {
  //     isLoading,
  //     response,
  //     setResponse,
  //     error,
  //     setError,
  //     setSuccessMessageValue,
  //   },
  //   handleAPICallSubmit,
  //   successMessageValue,
  // ] = useFetchApi(apiURL);

  // function arrayBufferToBase64(buffer) {
  //   let binary = "";
  //   let bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => (binary += String.fromCharCode(b)));
  //   return window.btoa(binary);
  // }

  return <div>jfajsdlf</div>;
}

export default TeamPage;
// state = {
//   teamArray: [],
//   ourTeam: "",
//   pictureArray: undefined,
// };

//   componentDidMount = async () => {
//     try {
//       let getTeamPlayers = await Axios.get("/api/pics/team-images");
//       console.log(getTeamPlayers);
//       let teamImagesArray = getTeamPlayers.data.payload[1];
//       let teamPlayersArray = getTeamPlayers.data.payload[0];
//       console.log(teamPlayersArray);
//       console.log(teamImagesArray);
//       let teamId = teamPlayersArray[0].team[0];
//       console.log(teamId);
//       let getTeam = await Axios.get(`/api/team/get-team/${teamId}`);
//       let teamName = getTeam.data.payload.teamName;
//       console.log(teamImagesArray);
//       this.setState({
//         teamArray: teamPlayersArray,
//         ourTeam: teamName,
//         pictureArray: teamImagesArray,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   render() {
//     const { ourTeam, teamArray } = this.state;
//     return (
//       <div>
//         <div className="team-header">
//           <h1>Team Page</h1>
//         </div>
//         <div className="content-container">
//           <div className="team-roster">
//             <div
//               style={{
//                 width: "25%",
//                 margin: "auto",
//                 textAlign: "center",
//                 textDecoration: "underline",
//               }}
//             >
//               {ourTeam}
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-around" }}>
//               <div>
//                 {this.state.pictureArray &&
//                   this.state.pictureArray.map((pic, index) => {
//                     let myPic = this.arrayBufferToBase64(pic.data.data);
//                     let myFinalPic = `data:image/png;base64,${myPic}`;
//                     return (
//                       <div key={index}>
//                         <img
//                           style={{ width: "75px" }}
//                           src={myFinalPic}
//                           alt="profile-pic"
//                         />
//                       </div>
//                     );
//                   })}
//               </div>
//               <div>
//                 {teamArray.map((player) => {
//                   return (
//                     <div
//                       style={{
//                         height: "75px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                       key={player._id}
//                     >
//                       <div>{player.firstName}</div>
//                       <div>{player.lastName}</div>
//                     </div>
//                   );
//                 })}
//                 {/* insert pagination */}
//               </div>
//             </div>
//           </div>
//           <div className="schedule-stats-container">
//             <div className="schedule">schedule</div>
//             <div className="stats">stats</div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
