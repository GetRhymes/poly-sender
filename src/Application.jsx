import React, {useContext, useState} from "react";
import {AuthContext, PathContext} from "./context";
import AuthNavigation from "./pages/auth/AuthNavigation";
import Sidebar from "./components/main-page/Sidebar";
import NavigationRoutes from "./pages/NavigationRoutes";
import LoadingScreen from "./components/LoadingScreen";

function Application() {

    const [rootPath, setRootPath] = useState("")

    const [create, setCreate] = useState(false)

    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading === true) {
        return <LoadingScreen/>
    }

    return (
        !isAuth ?
            <AuthNavigation/>
            :
            <PathContext.Provider value={{rootPath, setRootPath, create, setCreate}}>
                <div className="cont">
                    <Sidebar/>
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