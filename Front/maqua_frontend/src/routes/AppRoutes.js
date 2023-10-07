import React from "react";

import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";

import Layout from "../containers/Layout/Layout";
import RegisterStudent from "../components/auth/registration/register-student";
import RegisterTeacher from "../components/auth/registration/register-teacher";
import Home from "../components/home/Home";
import Teacher from "../components/Teacher/Teacher";
import UsersList from "../components/User/UsersList";
import Planner from "../components/planner/Planner";
import NotFound from "../components/notfound/Notfound";
import Login from "../components/auth/login/login";

const AppRoutes = () => (
<Router>
    <Layout>
        <Routes>
            <Route path="/register-student" exact element={<RegisterStudent/>}/>
            <Route path="/register-teacher" exact element={<RegisterTeacher/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/" exact element={<Planner/>}/>
            <Route path="/teacher" exact element={<Teacher/>}/>
            <Route path="/user" exact element={<UsersList/>}/>
            <Route element={<NotFound/>}/>
        </Routes>
    </Layout>
</Router>
); 

export default AppRoutes;