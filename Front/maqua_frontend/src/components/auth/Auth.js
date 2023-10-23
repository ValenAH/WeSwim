import React,{ Children, createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({children}) {
    const navigate = useNavigate();
    const[user, setUser]= useState();

    const login = ({username, password})=>{
        setUser({username,password});
        navigate("/planner")
    }
    const logout= ()=>{
        setUser(null);
        navigate("/")
    }

    const auth = { user, login, logout };

    return (
        <AuthContext.Provider value= {auth}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
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