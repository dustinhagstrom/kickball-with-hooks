import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import MainRouter from "./MainRouter";
import AuthContextWrapper from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextWrapper>
        <MainRouter />
      </AuthContextWrapper>
    </Router>
  );
}

export default App;
