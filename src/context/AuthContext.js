import { createContext, useReducer } from "react";

export const AuthContext = createContext({}); //create a user auth context.

//there is not an initial user
const initialState = {
  user: null,
};

//reducer function with switch statement for returning user.
//action
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: {
          email: action.user.email,
          username: action.user.username,
          isTeamCaptain: action.user.isTeamCaptain,
          isOnATeam: action.user.isOnATeam,
          isAuth: true,
        },
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
}

function AuthContextWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
