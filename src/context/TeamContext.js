import { createContext, useReducer } from "react";

export const TeamContext = createContext({}); //create a user auth context.

//there is not an initial user
const initialState = {
  teamObject: null,
};

//reducer function with switch statement for returning user.
//action
function reducer(state, action) {
  switch (action.type) {
    case "SET-TEAMS":
      return {
        teamObject: {
          teamArray: action.teamObject.teamArray,
        },
      };
    case "RESET-TEAMS":
      return {
        teamObject: null,
      };
    default:
      return state;
  }
}

function TeamContextWrapper({ children }) {
  const [state, dispatchTeam] = useReducer(reducer, initialState);
  return (
    <TeamContext.Provider value={{ state, dispatchTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export default TeamContextWrapper;
