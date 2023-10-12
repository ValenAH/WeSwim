import React from "react";
import './Header.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import {BiSolidUserCircle} from "react-icons/bi";
import { AuthData } from "../auth/Auth";

const Header = () => {
    const auth = AuthData();
    const navigate = useNavigate();

    const handleLogout= ()=>{
      auth.logout();
      navigate("/login")
    }
    return (
      <nav className="header">
        <div className="container">
          <header className="d-flex justify-content-between align-items-center">
            <Link to="/">
              <img className="header__img ms-2" src={logo} alt="Maqua" />
            </Link>
            <ul className="header__menu d-flex align-items-center p-0 m-0 gap-3">
              <li>
                <a className="p-2" href="/">Agenda</a>
              </li>
              <li>
                <a className="p-2" href="/teacher">Profesor</a>
              </li>
              <li>
                <a className="p-2" href="/customer">Cliente</a>           
              </li>
              <li>
                <a className="p-2" href="/user">Usuarios</a>
              </li>
              <li>
                <a className="p-2" href="/bank">Bancos</a>
              </li>
            </ul>
            <div className="profile d-flex align-items-center gap-2 px-2">
              <a className="text-decoration-none text-light" href="" id="profileOptions" data-bs-toggle="dropdown" aria-expanded="false">
                <BiSolidUserCircle className="profile__icon rounded"></BiSolidUserCircle>
                  <span>{auth.user}</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="profileOptions">
                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</a></li>
              </ul>
            </div>

          </header> 
        </div>
      </nav>
    )
};
export default Header;
