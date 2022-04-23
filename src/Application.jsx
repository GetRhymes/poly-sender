import React, {useContext, useState} from "react";
import {AuthContext} from "./context";
import AuthNavigation from "./pages/AuthNavigation";
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

    console.log("Application")
    console.log(isAuth)

    return (
        !isAuth ?
            <AuthNavigation/>
            :
            <div className="cont">
                <Sidebar rootPath={rootPath} create={create}/>
                <div className="active__screen">
                    <div className="plug"/>
                    <div className="dashboard">
                        <NavigationRoutes setRootPath={setRootPath} setCreate={setCreate}/>
                    </div>
                </div>
            </div>
    );
}

export default Application;