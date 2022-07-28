import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { API_URL } from "./config/config";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorAlert from "./components/ErrorAlert";

axios.defaults.baseURL = API_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorAlert />
    <GoogleOAuthProvider clientId="195046756501-pg2ktn9ociknvjsltlhi27c9b39hq7qb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);
