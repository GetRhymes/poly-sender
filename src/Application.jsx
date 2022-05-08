import React, {useContext, useEffect, useState} from "react";
import {AuthContext, PathContext} from "./context";
import AuthNavigation from "./pages/auth/AuthNavigation";
import Sidebar from "./components/main-page/Sidebar";
import NavigationRoutes from "./pages/NavigationRoutes";
import LoadingScreen from "./components/LoadingScreen";
import {useStateIfMounted} from "use-state-if-mounted";
import {useNavigate} from "react-router-dom";

function Application() {

    const [rootPath, setRootPath] = useStateIfMounted("")

    const [create, setCreate] = useStateIfMounted(false)

    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)

    const [roles, setRoles] = useState([])

    const [loadAttrAfterNot, setLoadAttrAfterNot] = useState(false)
    const [loadFilterAfterNot, setLoadFilterAfterNot] = useState(false)

    let rolesFromStorage = []

    if (localStorage.getItem('roles')) {
        rolesFromStorage = localStorage.getItem('roles').split(',')
    }

    let navigate = useNavigate();

    function redirect() {
        navigate("/login");
    }

    function handleAccess(number) {
        if (number === 403) {
            setIsAuth(false)
            localStorage.removeItem('disabled')
            localStorage.removeItem('auth')
            localStorage.removeItem('idStaff')
            localStorage.removeItem('fullName')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            localStorage.removeItem('roles')
            localStorage.removeItem('auth')
            localStorage.removeItem('page')
            redirect()
        }
    }

    useEffect(() => {
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
            <PathContext.Provider value={{
                rootPath,
                setRootPath,
                create,
                setCreate,
                loadAttrAfterNot,
                setLoadAttrAfterNot,
                loadFilterAfterNot,
                setLoadFilterAfterNot,
                handleAccess
            }}>
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