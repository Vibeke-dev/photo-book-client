import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProviderWrapper } from "./context/theme.context";
import 'bootstrap/dist/css/bootstrap.css';
// import "bootstrap-3-card\sass\_card.scss";


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ThemeProviderWrapper>
      <AuthProviderWrapper>  
          <App />
      </AuthProviderWrapper>
      </ThemeProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
 
reportWebVitals();