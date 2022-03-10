import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProviderWrapper } from "./context/theme.context";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();