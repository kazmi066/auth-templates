import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AxiosClient } from "./axiosClient";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AxiosClient>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AxiosClient>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
