import React from "react";
import './Header.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import {BiSolidUserCircle} from "react-icons/bi";

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
            <a className="p-2" href="/login">Login</a>
          </li>
          <li>
            <a className="p-2" href="/register-student">Registrar estudiante</a>
          </li>
          <li>
            <a className="p-2" href="/register-teacher">Registrar Profesor</a>
          </li>
          <li>
            <a className="p-2" href="/">Agenda</a>
          </li>
          <li>
            <a className="p-2" href="/Teacher">Profesor</a>
          </li>
          <li>
            <a className="p-2" href="/Customer">Cliente</a>           
          </li>
          <li>
            <a className="p-2" href="/User">Usuarios</a>
          </li>
        </ul>
        <div className="profile d-flex align-items-center gap-2 px-2">
          <a className="text-decoration-none text-light" href="/profile">
            <BiSolidUserCircle className="profile__icon rounded"></BiSolidUserCircle>
              <span>Valen</span>
          </a>      
        </div>
      </header>
      </div>
      </section>
    )
};
export default Header;
