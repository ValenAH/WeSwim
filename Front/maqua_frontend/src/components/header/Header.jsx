import React from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import { useAuth } from "../auth/Auth";
import { useLocation } from "react-router-dom";

const Header = () => {
    const auth = useAuth();

    let location = useLocation();

    const handleLogout= (e)=>{
      e.preventDefault();
      auth.logout();
    }
    return (
      <nav className="header">
        <div className="container">
          <header className="d-flex justify-content-between align-items-center">
            <NavLink to="/">
              <img className="header__img ms-2" src={logo} alt="Maqua" />
            </NavLink>
            <ul className="header__menu d-flex align-items-center p-0 m-0 gap-3">
              {routes.map(route => {

                if(route.publicOnly && auth.user) return null;
                if(route.private && !auth.user) return null;
                return(
                  <li key={route.to}>
                  <NavLink
                  className="p-1"
                  style={({isActive})=>({borderBottom: isActive ? '2px solid white': 'none'})}
                  to={route.to}
                  >
                    {route.text}
                  </NavLink>
                  </li>
                );
              })}
              { location.pathname == "/" ? 
                <li key={"prices"}>
                  <a href="#prices"> Planes</a>
              </li> : null
              }
              {!auth.user ? (
                <li key="login">
                  <NavLink
                    className="p-1"
                    style={({ isActive }) => ({ borderBottom: isActive ? '2px solid white' : 'none' })}
                    to="/login"
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
              ) : (
                <li key="logout">
                  <button type="button" className="header__logout p-1" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
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
