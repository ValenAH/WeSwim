import React, {useState } from "react";
import './login.scss'
import logo from "../../../assets/images/logo-maqua.svg";

import { useAuth } from "../Auth";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () =>{

    const auth = useAuth();
    const navigate = useNavigate();

    if(auth.user){
        return <Navigate to="/planner"/>
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await auth.login({ username, password });
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión. Revisa usuario y contraseña.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-fluid">
            <section className="login-page row d-flex justify-content-center align-items-center">
                <div className="login-container d-flex flex-column justify-content-center col-lg-4 col-md-8 col-xs-12 p-3 rounded-3">
                    <div className="text-center">
                        <img className="logo" src={logo} alt="MAQUA"></img>
                        <h1>Bienvenido a <br></br>MAQUA</h1>
                    </div>
                    <form className="p-5" onSubmit={handleLogin}>
                        {error && (
                            <div className="login__error mb-3 p-2 rounded" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" autoComplete="username" disabled={loading}></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" autoComplete="current-password" disabled={loading}></input>
                        </div>
                        <div className="d-flex flex-column mt-3">
                            <button className="btn__light" type="submit" disabled={loading}>
                                {loading ? 'Conectando...' : 'Iniciar sesión'}
                            </button>
                            <button type="button" className="btn" onClick={()=>navigate("/register-student")} disabled={loading}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export { Login };