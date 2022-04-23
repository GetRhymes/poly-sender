import './styles/App.css';
import React, {useEffect, useState} from "react";
import {AuthContext} from "./context";
import Application from "./Application";

function App() {

    const [isAuth, setIsAuth] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth') === 'true') {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
            <Application isAuth={isAuth} setIsAuth={setIsAuth}/>
        </AuthContext.Provider>
    );

}

export default App;
