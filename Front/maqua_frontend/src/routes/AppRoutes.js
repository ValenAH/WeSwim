import React from "react";

import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";

import Layout from "../containers/Layout/Layout";
import RegisterStudent from "../components/auth/registration/register-student";
import RegisterTeacher from "../components/auth/registration/register-teacher";
import Profile from "../components/profile/profile";
import Teacher from "../components/Teacher/Teacher";
import Customer from "../components/customer/Customer";
import UsersList from "../components/user/UsersList";
import Planner from "../components/planner/Planner";
import NotFound from "../components/notfound/Notfound";
import Login from "../components/auth/login/login";
import Bank from "../components/bank/Bank";
import UserForm from "../components/user/UserForm";
import AddCustomerForm from "../components/customer/AddCustomerForm";

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
            <Route path="/customer/:id" exact element={<AddCustomerForm/>}/>
            <Route path="/user" exact element={<UsersList/>}/>
            <Route path="/user/:id" exact element={<UserForm/>}/>
            <Route path="/profile" exact element={<Profile/>}/>
            <Route path="/bank" exact element={<Bank/>}/>

            <Route element={<NotFound/>}/>
        </Routes>
    </Layout>
</Router>
); 

export default AppRoutes;