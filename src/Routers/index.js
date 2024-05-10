import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";
import { Boards } from "../Screens/Boards";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
import React from 'react';



export default function AdminRouter() {
  return (
    <BrowserRouter basename="/trello">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />  
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        {/* <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} /> */}
        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/board/:id" element={<ProtectedRoutes Components={Boards} />} />
        {/* <Route path="/product-management" element={<ProtectedRoutes Components={ProductManagement} />} />
        <Route path="/add-product" element={<ProtectedRoutes Components={AddProduct} />} />
        <Route path="/product-management/product-details/:id" element={<ProtectedRoutes Components={ProductDetails} />} />
        <Route path="/product-management/edit-product/:id" element={<ProtectedRoutes Components={EditProduct} />} />
        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} /> */}

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
