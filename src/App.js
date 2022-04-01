import './styles/App.css';
import Sidebar from "./components/main-page/Sidebar";
import React from "react";
import NavigationRoutes from "./pages/NavigationRoutes";

function App() {
    return (
        <div className="cont">
            <Sidebar/>
            <div className="active__screen">
                <div className="plug"/>
                <div className="dashboard">
                    <NavigationRoutes/>
                </div>
            </div>
        </div>
    );
}

export default App;
