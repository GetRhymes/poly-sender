import React, {useContext, useEffect, useState} from "react";
import {AuthContext, PathContext} from "./context";
import AuthNavigation from "./pages/auth/AuthNavigation";
import Sidebar from "./components/main-page/Sidebar";
import NavigationRoutes from "./pages/NavigationRoutes";
import LoadingScreen from "./components/LoadingScreen";
import {useStateIfMounted} from "use-state-if-mounted";

function Application() {

    const [rootPath, setRootPath] = useStateIfMounted("")

    const [create, setCreate] = useStateIfMounted(false)

    const {isAuth, isLoading} = useContext(AuthContext)

    const [roles, setRoles] = useState([])

    let rolesFromStorage = []

    if (localStorage.getItem('roles')) {
        rolesFromStorage = localStorage.getItem('roles').split(',')
    }

    useEffect(()=> {
        if (rolesFromStorage.length > 0) {
            setRoles(rolesFromStorage)
        }
    }, [])

    if (isLoading === true) {
        return <LoadingScreen/>
    }

    return (
        !isAuth ?
            <AuthNavigation setRoles={setRoles}/>
            :
            <PathContext.Provider value={{rootPath, setRootPath, create, setCreate}}>
                <div className="cont">
                    <Sidebar roles={roles}/>
                    <div className="active__screen">
                        <div className="plug"/>
                        <div className="dashboard">
                            <NavigationRoutes/>
                        </div>
                    </div>
                </div>
            </PathContext.Provider>
    );
}

export default Application;