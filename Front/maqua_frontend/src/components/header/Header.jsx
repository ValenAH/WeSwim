import React from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import { useAuth } from "../auth/Auth";

const Header = () => {
    const auth = useAuth();



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
  to:'/',
  text:'Quienes Somos',
  private: false,
  publicOnly: true
},
{
  to:'/',
  text:'Tarifas',
  private: false,
  publicOnly: true
})

export {Header};
