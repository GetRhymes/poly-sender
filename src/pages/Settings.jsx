import React, {useContext, useEffect, useState} from 'react';
import '../styles/Settings.css'
import PopupLoading from "../components/PopupLoading";
import {useStateIfMounted} from "use-state-if-mounted";
import Divider from "@mui/material/Divider";
import {Button, TextField} from "@mui/material";
import {PathContext} from "../context";
import {changeAccess, changePassword} from "../util/AsyncFunctionStaff";

function Settings() {

    const {setRootPath, handleAccess} = useContext(PathContext)

    useEffect(() => {
        const isDisabled = localStorage.getItem('disabled')
        if (isDisabled) {
            setIsDisable(true)
        }
        setRootPath("Настройки")
        return (() => {
            setRootPath("")
        })
    }, [])

    const [loading, setLoading] = useState(false)

    const [oldPassword, setOldPassword] = useStateIfMounted(null)

    function handleOldPassword(event) {
        setOldPassword(event.target.value)
    }

    const [newPassword, setNewPassword] = useStateIfMounted(null)

    function handleNewPassword(event) {
        setNewPassword(event.target.value)
    }

    const [repeatNewPassword, setRepeatNewPassword] = useStateIfMounted(null)

    function handleRepeatNewPassword(event) {
        setRepeatNewPassword(event.target.value)
    }

    const [status, setStatus] = useStateIfMounted(null)

    const [equals, setEquals] = useStateIfMounted(null)

    const [isDisable, setIsDisable] = useState(!!localStorage.getItem('disabled'))

    return (
        <div className="settings">
            <div className="password__block">
                <p className="settings__label">Изменить пароль</p>
                <div className="settings__block__password">
                    <TextField
                        value={oldPassword !== null ? oldPassword  : ""}
                        focused={oldPassword !== null}
                        color={getColorPassword(equals, status, 1)}
                        onChange={handleOldPassword}
                        sx={{width: "300px", marginBottom: "20px"}}
                        label={getLabelPassword(equals, status, 1)}
                        type="password"
                    />
                    <TextField
                        value={newPassword !== null ? newPassword  : ""}
                        focused={newPassword !== null}
                        color={getColorPassword(equals, status, 2)}
                        onChange={handleNewPassword}
                        sx={{width: "300px", marginBottom: "20px"}}
                        label={getLabelPassword(equals, status, 2)}
                        type="password"
                    />
                    <TextField
                        value={repeatNewPassword !== null ? repeatNewPassword  : ""}
                        focused={repeatNewPassword !== null}
                        color={getColorPassword(equals, status, 3)}
                        onChange={handleRepeatNewPassword}
                        sx={{width: "300px", marginBottom: "20px"}}
                        label={getLabelPassword(equals, status, 3)}
                        type="password"
                    />
                    <Button
                        sx={{
                            width: "200px",
                            marginTop: "20px",
                            paddingRight: "13px",
                            borderRadius: "30px",
                            backgroundColor: "#366ac3",
                            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                            color: "white",
                            ":hover": {
                                color: "#ffffff",
                                backgroundColor: "#739ee8"
                            }
                        }}
                        onClick={() => {
                            if (newPassword === repeatNewPassword) {
                                setEquals(true)
                                changePassword(
                                    localStorage.getItem('idStaff'),
                                    oldPassword,
                                    newPassword,
                                    setLoading,
                                    setStatus,
                                    setEquals,
                                    setOldPassword,
                                    setNewPassword,
                                    setRepeatNewPassword,
                                    handleAccess
                                )
                            } else {
                                setEquals(false)
                            }
                        }}
                    >
                        Изменить
                    </Button>
                </div>

            </div>
            <Divider/>
            <div className="access__block">
                <p className="settings__label">Запросить права администратора</p>
                <div className="settings__block__password">
                    <Button
                        disabled={isDisable}
                        sx={{
                            width: "200px",
                            marginTop: "30px",
                            paddingRight: "13px",
                            borderRadius: "30px",
                            backgroundColor: "#366ac3",
                            color: "white",
                            boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                            ":hover": {
                                color: "#ffffff",
                                backgroundColor: "#739ee8"
                            }
                        }}
                        onClick={() => changeAccess(
                            localStorage.getItem('idStaff'),
                            setLoading,
                            setIsDisable,
                            handleAccess
                        )}
                    >
                        Запросить
                    </Button>
                </div>
            </div>
            <PopupLoading active={loading}/>
        </div>
    );
}

function getColorPassword(equals, status, idTextField) {
    if (equals !== null) {
        if (equals) {
            if (status !== null) {
                return idTextField === 1 ? status : 'success'
            } else {
                return idTextField === 1 ? 'primary' : 'success'
            }
        } else {
            return idTextField > 1 ? 'error' : 'primary'
        }
    } else return 'primary'
}

function getLabelPassword(equals, status, idTextField) {
    if (equals === null) {
        return idTextField === 1 ?
            'Введите старый пароль'
            :
            idTextField === 2 ?
                'Введите новый пароль'
                :
                'Повторите новый пароль'
    }
    if (equals) {
        if (status !== null) {
            if (status === 'error' && idTextField === 1) return 'Неправильный старый пароль'
            else return idTextField === 1 ?
                'Введите старый пароль'
                :
                idTextField === 2 ?
                    'Введите новый пароль'
                    :
                    'Повторите новый пароль'
        } else {
            return idTextField === 1 ?
                'Введите старый пароль'
                :
                idTextField === 2 ?
                    'Введите новый пароль'
                    :
                    'Повторите новый пароль'
        }
    } else {
        return idTextField > 1 ? 'Пароли не совпадают' : 'Введите старый пароль'
    }
}

export default Settings;