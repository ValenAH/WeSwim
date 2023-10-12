import React from "react";

import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";

import Layout from "../containers/Layout/Layout";
import RegisterStudent from "../components/auth/registration/register-student";
import RegisterTeacher from "../components/auth/registration/register-teacher";
import Profile from "../components/profile/profile";
import Teacher from "../components/Teacher/Teacher";
import Customer from "../components/Customer/Customer";
import UsersList from "../components/User/UsersList";
import Planner from "../components/planner/Planner";
import NotFound from "../components/notfound/Notfound";
import Login from "../components/auth/login/login";
import Bank from "../components/bank/Bank";
import UserForm from "../components/user/UserForm";
import { AuthProvider } from "../components/auth/Auth";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                
                    <Routes>
                        <Route path="/register-student" element={<RegisterStudent/>}/>
                        <Route path="/register-teacher" element={<RegisterTeacher/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Planner/>}/>
                        <Route path="/teacher" element={<Teacher/>}/>
                        <Route path="/customer" element={<Customer/>}/>
                        <Route path="/user" element={<UsersList/>}/>
                        <Route path="/user/:id" element={<UserForm/>}/>     
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/bank" element={<Bank/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                
            </Router>
        </AuthProvider>
        );
}
 

export default AppRoutes;