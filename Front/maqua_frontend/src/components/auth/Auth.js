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
        const roleId = data.role_Id;
        if (roleId === 1) navigate("/dashboard");
        else if (roleId === 3) navigate("/profile");
        else navigate("/planner");
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
    if (!auth.user) return <Navigate to="/login" />;
    return props.children;
}

function RoleRoute({ children, allowedRoles }) {
    const auth = useAuth();
    if (!auth.user) return <Navigate to="/login" />;
    const roleId = auth.user?.role_Id != null ? Number(auth.user.role_Id) : null;
    if (allowedRoles == null || allowedRoles.length === 0 || (roleId != null && allowedRoles.includes(roleId))) {
      return children;
    }
    if (roleId === 3) return <Navigate to="/profile" />;
    return <Navigate to="/planner" />;
}

export {
    AuthProvider,
    useAuth,
    PrivateRoute,
    RoleRoute
};