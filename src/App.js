import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";
import AuthContextWrapper from "./context/AuthContext";
import TeamContextWrapper from "./context/TeamContext";

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <TeamContextWrapper>
            <MainRouter />
          </TeamContextWrapper>
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  );
}

export default App;
