import React, { useRef, useState, useEffect } from "react";
import './login.scss'
import logo from "../../../assets/images/logo-maqua.svg";

const Login = () =>{

    return (
        <div className="container-fluid">
            <section className="login-page row d-flex justify-content-center align-items-center">
                <div className="login-container col-lg-4 col-md-8 col-xs-12 m-5 p-5 rounded-3">
                    <div className="text-center">
                        <img src={logo}></img>
                        <h1>Bienvenido a <br></br>MAQUA</h1>
                    </div>              
                    <form className="p-5">
                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input></input>
                        </div>
                        <div className="d-flex flex-column mt-5">
                            <button className="btn__light">Iniciar sesión</button>
                            <button className="btn">Registrarse</button>
                        </div>                
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login;