import React from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import {HiMenu} from "react-icons/hi";

const Header = () => {
    return (
      <section className="header">
        <div className="container">
        <header className="d-flex justify-content-between align-items-center">
        <Link to="/">
          <img className="header__img ms-2" src={logo} alt="Maqua" />
        </Link>
        <ul className="header__menu d-flex align-items-center p-0 m-0 gap-3">
          <li>
            <a className="p-2" href="/">Inicio</a>
          </li>
          <li>
            <a className="p-2" href="/Teacher">Profesor</a>
          </li>
          <li>
            <a className="p-2" href="/User">Usuarios</a>
          </li>
        </ul>
        <div>
            <HiMenu className="header__icon p-2 rounded"></HiMenu>
          </div>
      </header>
      </div>
      </section>
    )
};
export default Header;
