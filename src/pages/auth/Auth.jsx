import React, {useContext, useState} from 'react';
import '../../styles/Auth.css'
import {Button, TextField} from "@mui/material";
import {AuthContext} from "../../context";
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import PopupLoading from "../../components/PopupLoading";
import {URL_check} from "../../util/api";

function Auth({setRoles}) {

    const [login, setLogin] = useState("")

    const [password, setPassword] = useState("")

    const [correctLogin, setCorrectLogin] = useState(true)

    const [correctPassword, setCorrectPassword] = useState(true)

    const [loading, setLoading] = useState(false)

    function handleLogin(event) {
        setLogin(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    const {setIsAuth} = useContext(AuthContext)

    let navigate = useNavigate();

    function createAccount() {
        let path = "/login/signup"
        navigate(path);
    }

    function returnPassword() {
        let path = "/login/forgot-password"
        navigate(path)
    }

    async function checkSignIn() {
        if (login.length === 0 || password.length === 0) {
            if (login.length === 0) setCorrectLogin(false)
            if (password.length === 0) setCorrectPassword(false)
        } else {
            setLoading(true)
            const data = {
                login: login,
                password: password
            }
            const isCorrect = await axios.post(URL_check, data)
            if (isCorrect.data.status === true) {
                setIsAuth(true)
                localStorage.setItem('idStaff', isCorrect.data.idStaff)
                localStorage.setItem('fullName', isCorrect.data.fullName)
                localStorage.setItem('email', isCorrect.data.email)
                localStorage.setItem('token', isCorrect.data.token)
                localStorage.setItem('roles', isCorrect.data.roles)
                localStorage.setItem('auth', isCorrect.data.status)
                setRoles(isCorrect.data.roles)
            } else {
                setCorrectLogin(false)
                setCorrectPassword(false)
            }
            setLoading(false)
        }
    }

    return (
        <div className="page">
            <div className="page_auth background__auth">
                <p className="auth__header">Poly Sender</p>
                <Divider/>
                <div className="auth__plug"/>
                <TextField
                    color={!correctLogin ? "error" : null}
                    onChange={handleLogin}
                    sx={{marginTop: "20px"}}
                    label="Введите почту"
                    focused={true}
                />
                <TextField
                    color={!correctPassword ? "error" : null}
                    onChange={handlePassword}
                    sx={{marginTop: "20px"}}
                    type="password"
                    label="Введите пароль"
                    focused={true}
                />
                <div className="forgot__password">
                    <Button
                        onClick={returnPassword}
                    >
                        Забыли пароль?
                    </Button>
                </div>
                <div className="auth__login">
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
                        onClick={() => checkSignIn()}
                    >
                        Войти
                    </Button>
                </div>
                <Divider/>
                <div className="auth__signup">
                    <Button
                        sx={{
                            width: "100%",
                        }}
                        onClick={createAccount}
                    >
                        Получить учетную запись
                    </Button>
                </div>
            </div>
            <PopupLoading active={loading}/>
        </div>
    );
}

export default Auth;