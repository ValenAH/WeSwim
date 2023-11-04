import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterStudent from "../components/auth/registration/register-student";
import RegisterTeacher from "../components/auth/registration/register-teacher";
import Profile from "../components/profile/profile";
import { Teacherform } from "../components/teacher/Teacherform";
import TeacherList from "../components/teacher/TeacherList";
import UsersList from "../components/User/UsersList";
import Planner from "../components/planner/Planner";
import NotFound from "../components/notfound/Notfound";
import { Login } from "../components/auth/login/login";
import UserForm from "../components/user/UserForm";
import { AuthProvider, PrivateRoute } from "../components/auth/Auth";
import {Home} from "../components/home/Home";
import {Layout} from "../containers/Layout/Layout";
import Transaction from "../components/transactionhistory/Transaction";
import { CustomerForm } from "../components/customer/CustomerForm";
import CustomerList from "../components/customer/CustomerList";

const AppRoutes = () => {
    return (
            <BrowserRouter>
                <AuthProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home/>} />
                                <Route path="/register-student" element={<RegisterStudent/>}/>
                                <Route path="/register-teacher" element={<RegisterTeacher/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/planner" element={<PrivateRoute><Planner/></PrivateRoute>}/>
                                <Route path="*" element={<NotFound/>}/>
                                <Route path="/teacher" exact element={<TeacherList/>}/>
                                <Route path="/teacher/:id" exact element={<Teacherform/>}/>
                                <Route path="/user" element={<UsersList/>} />
                                <Route path="/user/:id" element={<UserForm/>} />                              
                                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />                               
                                <Route path="/transaction" exact element={<Transaction/>}/>
                                <Route path="/customer" exact element={<CustomerList/>}/>
                                <Route path="/customer/:id" exact element={<CustomerForm/>}/>
                            </Routes>
                        </Layout>
                </AuthProvider>
            </BrowserRouter>
        );
}
 

export default AppRoutes;