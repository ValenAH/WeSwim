import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import "./Layout.scss";
import "../../index.scss"

const Layout = ({ children }) => (
  <div className="App">
    <Header />
        {children}
  </div>
);

export default Layout;
