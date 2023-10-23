import React, { useRef, useState, useEffect, useReducer } from "react";
import './login.scss'
import logo from "../../../assets/images/logo-maqua.svg";

import { useAuth } from "../Auth";
import { Navigate } from "react-router-dom";

const Login = () =>{

    const auth = useAuth();

    if(auth.user){
        return <Navigate to="/planner"/>
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = async (e) => {
        e.preventDefault();
        auth.login({username, password})
    }

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
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text"></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"></input>
                        </div>
                        <div className="d-flex flex-column mt-5">
                            <button className="btn__light" onClick={handleLogin}>Iniciar sesión</button>
                            <button className="btn" onClick={()=>navigate("/register-student")}>Registrarse</button>
                        </div>                
                    </form>
                </div>
            </section>
        </div>
    )
}

export { Login };