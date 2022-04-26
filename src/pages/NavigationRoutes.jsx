import React from 'react';
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserAdminRoutes from "./routes/UserAdminRoutes";


function NavigationRoutes() {
    if (localStorage.getItem('roles')) {
        const roles = localStorage.getItem('roles').split(',')

        if (roles.length === 1 && roles.includes('ADMIN')) return (<AdminRoutes/>)
        if (roles.length === 1 && roles.includes('USER')) return (<UserRoutes/>)
        if (roles.includes('USER') && roles.includes('ADMIN')) return (<UserAdminRoutes/>)
    } else return (<></>);
}

export default NavigationRoutes;