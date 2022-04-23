import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./auth/Auth";
import SignUp from "./auth/SignUp";

function AuthNavigation() {
    return (
        <Routes>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    );
}

export default AuthNavigation;