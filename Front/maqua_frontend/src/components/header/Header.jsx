import React, { useState, useRef, useEffect } from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import { useAuth } from "../auth/Auth";
import { useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
    const auth = useAuth();
    const roleId = auth.user?.role_Id != null ? Number(auth.user.role_Id) : null;
    const location = useLocation();
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        setAccountMenuOpen(false);
        auth.logout();
    };

    return (
      <nav className="header">
        <div className="container">
          <header className="d-flex justify-content-between align-items-center">
            <NavLink to="/">
              <img className="header__img ms-2" src={logo} alt="Maqua" />
            </NavLink>
            <ul className="header__menu d-flex align-items-center p-0 m-0 gap-3">
              {!auth.user && routes.map(route => (
                <li key={route.to}>
                  <NavLink
                    className="p-1"
                    style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })}
                    to={route.to}
                  >
                    {route.text}
                  </NavLink>
                </li>
              ))}
              {!auth.user && location.pathname === "/" && (
                <li key="prices">
                  <a href="#prices">Planes</a>
                </li>
              )}
              {auth.user && roleId === 1 && (
                <li key="dashboard">
                  <NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/dashboard">Panel</NavLink>
                </li>
              )}
              {auth.user && [1, 2].includes(roleId) && (
                <li key="planner">
                  <NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/planner">Agenda</NavLink>
                </li>
              )}
              {auth.user && roleId === 1 && (
                <>
                  <li key="teacher"><NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/teacher">Profesores</NavLink></li>
                  <li key="user"><NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/user">Usuarios</NavLink></li>
                  <li key="customer"><NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/customer">Clientes</NavLink></li>
                  <li key="transaction"><NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/transaction">Ingresos</NavLink></li>
                </>
              )}
              {auth.user && roleId === 2 && (
                <li key="customer">
                  <NavLink className="p-1" style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })} to="/customer">Mis alumnos</NavLink>
                </li>
              )}
              {!auth.user && (
                <li key="login">
                  <NavLink
                    className="p-1"
                    style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })}
                    to="/login"
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
              )}
              {auth.user && (
                <li key="account" className="header__account" ref={accountRef}>
                  <button
                    type="button"
                    className="header__account-trigger p-1"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    aria-expanded={accountMenuOpen}
                    aria-haspopup="true"
                    aria-label="Cuenta"
                  >
                    <BsPersonCircle className="header__account-icon" />
                  </button>
                  {accountMenuOpen && (
                    <ul className="header__account-menu">
                      <li>
                        <NavLink
                          className="header__account-link"
                          to="/profile"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          Mi perfil
                        </NavLink>
                      </li>
                      <li>
                        <button type="button" className="header__account-link header__logout" onClick={handleLogout}>
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </header> 
        </div>
      </nav>
    )
};


const routes = [];
routes.push({
  to:'/',
  text:'Inicio',
  private: false
},
{
  to:'/we',
  text:'Nosotros',
  private: false
})

export {Header};
