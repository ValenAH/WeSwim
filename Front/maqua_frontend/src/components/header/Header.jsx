import React from "react";
import './Header.scss';
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo-maqua.svg";
import { BiSolidUserCircle } from "react-icons/bi";
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
                  className="p-2"
                  style={({isActive})=>({borderBottom: isActive ? '2px solid white': 'none'})}
                  to={route.to}
                  >
                    {route.text}
                  </NavLink>
                  </li>
                );
              })}
            </ul>
              {auth.user ? (
              <div className="profile d-flex align-items-center gap-2 px-2">
                <NavLink className="text-decoration-none text-light" to="" id="profileOptions" data-bs-toggle="dropdown" aria-expanded="false">
                    <BiSolidUserCircle className="profile__icon rounded"></BiSolidUserCircle>
                      <span>{auth.user?.username}</span>
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="profileOptions">
                    <li><NavLink className="dropdown-item" to="/profile">Perfil</NavLink></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><NavLink className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</NavLink></li>
                  </ul>
              </div>
              ): null}
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
  to:'/login',
  text:'Iniciar sesión',
  private: false,
  publicOnly: true
},
{
  to:'/register-student',
  text:'Registrar estudiante',
  private: false,
  publicOnly: true
},
{
  to:'/register-teacher',
  text:'Registrar profesor',
  private: false,
  publicOnly: true
},
{
  to:'/planner',
  text:'Agenda',
  private: true
},
{
  to:'/teacher',
  text:'Profesor',
  private: true
},
{
  to:'/customer',
  text:'Cliente',
  private: true
},
{
  to:'/user',
  text:'Usuarios',
  private: true
},
{
  to:'/bank',
  text:'Bancos',
  private: true
})

export {Header};
