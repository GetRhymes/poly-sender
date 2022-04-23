import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./Auth";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

function AuthNavigation() {
    return (
        <Routes>
            <Route path="/login/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/login/forgot-password" element={<ForgotPassword/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    );
}

export default AuthNavigation;