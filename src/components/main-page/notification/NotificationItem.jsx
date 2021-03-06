import React, {useContext, useState} from "react";
import {Button, ToggleButton, ToggleButtonGroup} from "@mui/material";
import NotificationRowInfo from "./NotificationRowInfo";
import {acceptRequest, rejectRequest} from "../../../util/AsyncFunctionStaff";
import {PathContext} from "../../../context";

function NotificationItem({notification, setLoading, setData}) {

    const buttonStyle = {
        borderRadius: "5px",
        backgroundColor: "#366ac3",
        color: "white",
        ":hover": {
            color: "#ffffff",
            backgroundColor: "#739ee8"
        },
        width: "120px",
        height: "30px"
    }

    const toggleButtonStyle = {
        padding: "5px",
        height: "30px",
        width: "250px",
        marginBottom: "10px",
        marginTop: "10px"
    }

    const [type, setType] = useState('link');

    const handleChange = (event, newAlignment) => {
        setType(newAlignment);
    };

    const {setLoadFilterAfterNot, setLoadAttrAfterNot, handleAccess} = useContext(PathContext)
    return (
        <div className="notification__item">
            <p className="notification__label">{getNameTypeByType(notification.type)}</p>
            <div className="notification__info">
                <NotificationRowInfo leftText='Владелец:' rightText={notification.fullNameOwner}/>
                <NotificationRowInfo leftText='Название:' rightText={notification.name}/>
                <NotificationRowInfo leftText='Дата:' rightText={notification.date}/>
            </div>
            <ToggleButtonGroup
                color="primary"
                value={type}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton
                    sx={toggleButtonStyle}
                    value="copy"
                >
                    Копировать
                </ToggleButton>
                <ToggleButton
                    sx={toggleButtonStyle}
                    value="link"
                >
                    Ссылаться
                </ToggleButton>
            </ToggleButtonGroup>
            <div className="notification__action">
                <Button
                    onClick={() => {
                        if (type !== null) {
                            acceptRequest(setLoading, notification.idNotification, type, setData, setLoadFilterAfterNot, setLoadAttrAfterNot, handleAccess)
                        }
                    }}
                    sx={buttonStyle}
                >Принять</Button>
                <Button
                    onClick={() => rejectRequest(setLoading, notification.idNotification, setData, handleAccess)}
                    sx={buttonStyle}
                >Отклонить</Button>
            </div>
        </div>
    )
}

function getNameTypeByType(type) {
    if (type === 'filter') return 'Фильтр'
    if (type === 'attribute') return 'Атрибут'
}

export default NotificationItem;