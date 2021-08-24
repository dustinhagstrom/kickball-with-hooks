import { createContext, useReducer } from "react";

export const PicContext = createContext({}); //create a user auth context.

//there is not an initial user
const initialState = {
  picObject: null,
};

//reducer function with switch statement for returning user.
//action
function reducer(state, action) {
  switch (action.type) {
    case "SETPIC":
      return {
        picObject: {
          currentPic: action.picObject.newPic,
        },
      };
    case "RESETPIC":
      return {
        picObject: null,
      };
    default:
      return state;
  }
}

function PicContextWrapper({ children }) {
  const [state, dispatchPic] = useReducer(reducer, initialState);
  return (
    <PicContext.Provider value={{ state, dispatchPic }}>
      {children}
    </PicContext.Provider>
  );
}

export default PicContextWrapper;
