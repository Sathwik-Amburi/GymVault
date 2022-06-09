import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { API_URL } from "./config/config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GymViewPage from "./components/GymDetails";
import App from "./App";

axios.defaults.baseURL = API_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gym/:id" element={<GymViewPage />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);
