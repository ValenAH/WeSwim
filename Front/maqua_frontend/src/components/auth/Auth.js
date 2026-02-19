import React,{ createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { environment } from "../../environments/environment";

const AuthContext = createContext();

function AuthProvider({children}) {
    const navigate = useNavigate();
    const[user, setUser]= useState(() => {
        try {
            const saved = window.localStorage.getItem("maqua_user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const login = async ({username, password}) => {
        const res = await fetch(`${environment.API_BACKEND}users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            const err = new Error(data.error || "Error al iniciar sesión");
            err.status = res.status;
            throw err;
        }
        setUser(data);
        try {
            window.localStorage.setItem("maqua_user", JSON.stringify(data));
        } catch (_) {}
        navigate("/planner");
    };
    const logout = () => {
        setUser(null);
        try {
            window.localStorage.removeItem("maqua_user");
        } catch (_) {}
        navigate("/");
    };

    const auth = { user, login, logout };

    return (
        <AuthContext.Provider value= {auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

function PrivateRoute(props) {
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to="/login"/>;
    }
    return props.children
}

export {
    AuthProvider,
    useAuth,
    PrivateRoute
};