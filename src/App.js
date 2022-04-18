import './styles/App.css';
import Sidebar from "./components/main-page/Sidebar";
import React, {useState} from "react";
import NavigationRoutes from "./pages/NavigationRoutes";

function App() {

    const [rootPath, setRootPath] = useState("")

    const [create, setCreate] = useState(false)

    return (
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

export default App;
