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
import Transaction from "../components/transactionhistory/Transaction";

const AppRoutes = () => (
<Router>
    <Layout>
        <Routes>
            <Route path="/register-student" exact element={<RegisterStudent/>}/>
            <Route path="/register-teacher" exact element={<RegisterTeacher/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/" exact element={<Planner/>}/>
            <Route path="/teacher" exact element={<Teacher/>}/>
            <Route path="/customer" exact element={<Customer/>}/>
            <Route path="/user" exact element={<UsersList/>}/>
            <Route path="/profile" exact element={<Profile/>}/>
            <Route path="/transaction" exact element={<Transaction/>}/>
            <Route element={<NotFound/>}/>
        </Routes>
    </Layout>
</Router>
); 

export default AppRoutes;