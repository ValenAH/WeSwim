import React from "react";
import './Header.scss';
import { Link } from "react-router-dom";
//import logo from "../assets/static/logo.png";

const Header = () => (
  <header className="header">
    <Link to="/">
      <img className="header__img" src="{ logo }" alt="Logo" />
    </Link>

    <div className="header__menu">
      <div className="header__menu--profile">
        <img src="{ userIcon }" alt="" />
        <p>Menu 1</p>
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Teacher">Link We Swim Profesor</a>
        </li>
        <li>
          <Link to="/Teacher">Teacher</Link>
        </li>
      </ul>
    </div>
  </header>
);
export default Header;
