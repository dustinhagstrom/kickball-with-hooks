import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";
import AuthContextWrapper from "./context/AuthContext";
import React from "react";

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  );
}

export default App;
