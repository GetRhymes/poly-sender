import React, {useState} from 'react';
import Divider from "@mui/material/Divider";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PopupLoading from "../../components/PopupLoading";
import axios from "axios";
import authHeader, {URL_reset} from "../../util/api";

function ForgotPassword() {

    let navigate = useNavigate();

    function goBack() {
        let path = "/login"
        navigate(path);
    }

    const [loading, setLoading] = useState(false)

    const [login, setLogin] = useState("")

    const [correctLogin, setCorrectLogin] = useState(true)

    function handleLogin(event) {
        setLogin(event.target.value)
    }

    async function restorePassword() {
        setLoading(true)
        if (login.length > 0) {
            const data = {
                login: login
            }
            await axios.post(URL_reset, data)
            goBack()
        } else {
            setCorrectLogin(false)
        }
        setLoading(false)
    }

    return (
        <div className="page">
            <div className="page__forgot__password background__auth">
                <p className="auth__header">Poly Sender</p>
                <Divider/>
                <div className="forgot__plug"/>
                <TextField
                    color={!correctLogin ? "error" : null}
                    onChange={handleLogin}
                    sx={{marginTop: "0px"}}
                    label="Введите почту"
                    focused={true}
                />
                <div className="forgot__plug"/>
                <div className="auth__signup">
                    <Button
                        sx={{
                            width: "100%",
                            background: "#366ac3",
                            color: "white",
                            borderRadius: "5px",
                            ":hover": {
                                color: "#ffffff",
                                backgroundColor: "#739ee8"
                            }
                        }}
                        onClick={() => restorePassword()}
                    >
                        Восстановить пароль
                    </Button>
                </div>
            </div>
            <PopupLoading active={loading}/>
        </div>
    );
}

export default ForgotPassword;