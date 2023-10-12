import React,{ Children, createContext, useContext, useState } from "react";
import Layout from "../../containers/Layout/Layout";


const AuthContext = createContext(null);

export const AuthProvider = () => {

    const [user, setUser] = useState(null)

    const login = (user)=> {
       setUser(user)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value= {{user,login,logout}}>
            <Layout/>
        </AuthContext.Provider>
    )
}

export const AuthData = () => useContext(AuthContext);