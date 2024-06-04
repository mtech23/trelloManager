import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";
import { Boards } from "../Screens/Boards";
import { WorkPlace } from "../Screens/WorkPlaces";
import { CardDetail } from "../Screens/CardDetail";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
import React from 'react';



export default function AdminRouter() {
  return (
    <BrowserRouter basename="/trello">
      <AppRoutes />
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />
        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/w/:slug/:id" element={<ProtectedRoutes Components={WorkPlace} />} />
        <Route path="/b/:id/*" element={<ProtectedRoutes Components={Boards} />} />
        <Route path="/b/:id/:slug" element={<ProtectedRoutes Components={CardDetail} />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/b/:id/:slug" element={<ProtectedRoutes Components={CardDetail} />} />
        </Routes>
      )}
    </>
  );
};