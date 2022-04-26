import {Navigate, Route, Routes} from "react-router-dom";
import AccessManager from "../admin/AccessManager";
import DataManager from "../admin/DataManager";
import React from "react";

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/access-manager" element={<AccessManager/>}/>
            <Route path="/data-manager" element={<DataManager/>}/>
            <Route path="*" element={<Navigate to="/access-manager"/>}/>
        </Routes>
    );
}

export default AdminRoutes;