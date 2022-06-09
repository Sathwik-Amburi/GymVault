import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { API_URL } from "./config/config";
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.min.css';
<<<<<<< HEAD
=======

>>>>>>> e583a49 (Update index.tsx with font awesome import conflict)

axios.defaults.baseURL = API_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
