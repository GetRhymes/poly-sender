import React, {useState} from "react";
import {Button, FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import authHeader, {URL_change, URL_reject, URL_setup} from "../../util/api";

function RequestBlock({request, dataRoles, setLoading}) {

    const [selectorRole, setSelectorRole] = useState(() => {
        if (request.role === null) return 'USER'
        else return 'ADMIN'
    })

    function handleSelectorRole(event) {
        setSelectorRole(event.target.value)
    }

    const styleButton = {
        width: "125px",
        height: "40px"
    }

    return (
        <div className="request">
            <div className="request__header__block">
                <p className="request__header__label">{request.fullName}</p>
                <div className="request__plug"/>
            </div>
            <div className="request__body__block">
                <div className="request__info__block">
                    <RowInfo leftText="Почтовый адрес:" rightText={request.email}/>
                    <RowInfo leftText="Институт:" rightText={request.department}/>
                    <RowInfo leftText="Высшая школа:" rightText={request.highSchool}/>
                    <RowInfo leftText="Роль:" rightText={getRoleNameByRole(request.role)}/>
                    <RowInfo leftText="Тип запроса:" rightText={getTypeByRole(request.role)}/>
                    <RowInfo leftText="Дата:" rightText={request.date}/>
                </div>
                <div className="request__action__block">
                    <FormControl>
                        <InputLabel>Выберите роль</InputLabel>
                        <Select
                            sx={{width: "250px"}}
                            value={selectorRole}
                            label="Выберите роль"
                            onChange={handleSelectorRole}
                        >
                            {
                                dataRoles.map(({id, role}) => {
                                    return <MenuItem key={id} value={role}>{getRoleNameByRole(role)}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <div className="request__action__buttons">
                        <Button
                            sx={styleButton}
                            onClick={() => reject(request.idRequest, request.idStaff, setLoading)}
                        >Отклонить</Button>
                        <Button
                            sx={styleButton}
                            onClick={() => access(
                                request.idRequest,
                                selectorRole,
                                request.role === null ? 'setup' : 'change',
                                setLoading
                            )}
                        >Принять</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getTypeByRole(role) {
    if (role === null) return 'Получение доступа'
    else return 'Изменение прав доступа'
}

function getRoleNameByRole(role) {
    if (role === null) return 'Нет роли'
    if (role === 'USER') return 'Пользователь'
    if (role === 'ADMIN') return 'Администратор'
}

function RowInfo({leftText, rightText}) {
    return (
        <div className="request__row">
            <p className="request__row__left">{leftText}</p>
            <p className="request__row__right">{rightText}</p>
        </div>
    )
}

async function access(idRequest, role, type, setLoading) {
    setLoading(true)
    const data = {
        "idRequest": idRequest,
        "role": role,
    }
    if (type === 'setup') await axios.post(URL_setup, data, { headers: authHeader() })
    if (type === 'change') await axios.post(URL_change, data, { headers: authHeader() })
    console.log(data)
    setLoading(false)
}

async function reject(idRequest, idStaff, setLoading) {
    setLoading(true)
    const data = {
        "idRequest": idRequest,
        "role": null,
    }
    await axios.post(URL_reject, data, { headers: authHeader() })
    console.log(data)
    setLoading(false)
}



export default RequestBlock;