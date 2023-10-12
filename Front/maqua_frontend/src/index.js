import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter as Router} from 'react-router-dom';
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppRoutes/>
  </Router>
);
