import {Navigate, Route, Routes} from "react-router-dom";
import AccessManager from "../admin/AccessManager";
import DataManager from "../admin/DataManager";
import React from "react";
import Profile from "../Profile";
import Settings from "../Settings";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/access-manager" element={<AccessManager/>}/>
            <Route path="/data-manager" element={<DataManager/>}/>
            <Route path="*" element={<Navigate to="/access-manager"/>}/>
        </Routes>
    );
}

export default AdminRoutes;