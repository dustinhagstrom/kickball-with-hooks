import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";
import AuthContextWrapper from "./context/AuthContext";
import TeamContextWrapper from "./context/TeamContext";
import PicContextWrapper from "./context/PicContext";

// import "./_base.css";

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <TeamContextWrapper>
            <PicContextWrapper>
              <MainRouter />
            </PicContextWrapper>
          </TeamContextWrapper>
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  );
}

export default App;
