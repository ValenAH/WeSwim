import React from "react";

import { BrowserRouter as Router,Routes,Route, Link } from "react-router-dom";

import Layout from "../containers/Layout/Layout";
import Home from "../components/home/Home";
import Teacher from "../components/Teacher/Teacher";
import Customer from "../components/Customer/Customer";
import NotFound from "../components/notfound/Notfound";

const AppRoutes = () => (
<Router>
    <Layout>
        <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/teacher" exact element={<Teacher/>}/>
            <Route path="/customer" exact element={<Customer/>}/>
            <Route element={<NotFound/>}/>
        </Routes>
    </Layout>
</Router>
); 

export default AppRoutes;