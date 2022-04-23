import React, {useContext} from 'react';
import '../../styles/Auth.css'
import {Button} from "@mui/material";
import {AuthContext} from "../../context";

function Auth() {

    const {setIsAuth} = useContext(AuthContext)

    function handleAuth() {
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div className="page">
            <div className="page_auth background">
                <Button onClick={() => handleAuth()}>login</Button>
            </div>
        </div>
    );
}

export default Auth;