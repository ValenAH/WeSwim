import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {RegisterStudent} from "../components/auth/registration/register-student";
import {RegisterTeacher} from "../components/auth/registration/register-teacher";
import Profile from "../components/profile/profile";
import { Teacherform } from "../components/teacher/Teacherform";
import {TeacherList} from "../components/teacher/TeacherList";
import { UsersList } from "../components/user/UsersList";
import Planner from "../components/planner/Planner";
import NotFound from "../components/notfound/Notfound";
import { Login } from "../components/auth/login/login";
import UserForm from "../components/user/UserForm";
import { AuthProvider, PrivateRoute, RoleRoute } from "../components/auth/Auth";
import {Home} from "../components/website/home/Home";
import Layout from "../containers/Layout/Layout";
import Transaction from "../components/transactionhistory/Transaction";
import { CustomerForm } from "../components/customer/CustomerForm";
import {CustomerList} from "../components/customer/CustomerList";
import AdminDashboard from "../components/admin/AdminDashboard";
import { We } from "../components/website/we/we";
import { Classes } from "../components/website/classes/classes";

const AppRoutes = () => {
    return (
            <BrowserRouter>
                <AuthProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/we" element={<We/>}/>
                                <Route path="/classes" element={<Classes/>}/>
                                <Route path="/register-student" element={<RegisterStudent/>}/>
                                <Route path="/register-teacher" element={<RoleRoute allowedRoles={[1]}><RegisterTeacher/></RoleRoute>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/dashboard" element={<RoleRoute allowedRoles={[1]}><AdminDashboard/></RoleRoute>}/>
                                <Route path="/planner" element={<RoleRoute allowedRoles={[1, 2]}><Planner/></RoleRoute>}/>
                                <Route path="/teacher" element={<RoleRoute allowedRoles={[1]}><TeacherList/></RoleRoute>}/>
                                <Route path="/teacher/:id" element={<RoleRoute allowedRoles={[1]}><Teacherform/></RoleRoute>}/>
                                <Route path="/user" element={<RoleRoute allowedRoles={[1]}><UsersList/></RoleRoute>} />
                                <Route path="/user/:id" element={<RoleRoute allowedRoles={[1]}><UserForm/></RoleRoute>} />
                                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
                                <Route path="/transaction" element={<RoleRoute allowedRoles={[1]}><Transaction/></RoleRoute>}/>
                                <Route path="/customer" element={<RoleRoute allowedRoles={[1, 2]}><CustomerList/></RoleRoute>}/>
                                <Route path="/customer/:id" element={<RoleRoute allowedRoles={[1, 2]}><CustomerForm/></RoleRoute>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Layout>
                </AuthProvider>
            </BrowserRouter>
        );
}

export default AppRoutes;