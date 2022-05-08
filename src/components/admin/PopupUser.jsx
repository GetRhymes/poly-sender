import React, {useContext, useEffect} from 'react';
import '../../styles/UserManager.css'
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {useStateIfMounted} from "use-state-if-mounted";
import {changeRoles} from "../../util/AsyncFunctionAdmin";
import {PathContext} from "../../context";

function PopupUser({active, setActive, user, handler}) {

    const [userCheck, setUserCheck] = useStateIfMounted(false)
    const [adminCheck, setAdminCheck] = useStateIfMounted(false)

    useEffect(() => {
        if (user !== null) {
            setUserCheck(user.user)
            setAdminCheck(user.admin)
        }
        return (() => {
            setUserCheck(false)
            setAdminCheck(false)
        })
    }, [active])

    function handleUserCheck(event) {
        setUserCheck(event.target.checked)
    }

    function handleAdminCheck(event) {
        setAdminCheck(event.target.checked)
    }

    const {handleAccess} = useContext(PathContext)

    return (
        user === null ?
            <></>
            :
            <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
                <div className="user__content" onClick={(event) => event.stopPropagation()}>
                    <p className="user__header">Изменение ролей</p>
                    <div className="user__roles">
                        <p className="user__roles__label">{user.lastName} {user.firstName} {user.patronymic}</p>
                        <div className="background user__roles__checker">
                            <FormGroup sx={{marginLeft: "10px"}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="admin" checked={adminCheck} onChange={handleAdminCheck}/>}
                                    label="Администратор"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox name="user" checked={userCheck} onChange={handleUserCheck}/>}
                                    label="Пользователь"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="user__buttons">
                        <Button
                            sx={{height: "35px", width: "150px", borderRadius: "12px"}}
                            onClick={() => {
                                if (adminCheck || userCheck) {
                                    handler(adminCheck, userCheck)
                                    changeRoles(user.id, adminCheck, userCheck, handleAccess)
                                    setActive(false)
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            sx={{height: "35px", width: "150px", borderRadius: "12px"}}
                            onClick={() => setActive(false)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
    );
}

export default PopupUser;