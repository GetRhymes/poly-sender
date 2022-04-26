import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useStateIfMounted} from "use-state-if-mounted";
import axios from "axios";
import authHeader, {URL_getNotifications} from "../../../util/api";
import {dataNotificationJS} from "../../data/data";
import NotificationPopover from "./NotoficationPopover";

function Notification() {

    const [anchorEl, setAnchorEl] = useState(null);

    async function fetchNotification() {
        setLoading(true)
        const data = {
            "idStaff": localStorage.getItem('id')
        }
        // const result = await axios.post(URL_getNotifications, data, { headers: authHeader() })
        const result = {data: dataNotificationJS}
        setDataNotification(result.data)
        setLoading(false)
    }

    const [loading, setLoading] = useState(false)

    const [dataNotification, setDataNotification] = useStateIfMounted([])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        fetchNotification()
    };

    return (
        <>
            <IconButton onClick={handleClick} size="large" color="inherit">
                <NotificationsIcon/>
            </IconButton>
            <NotificationPopover
                dataNotification={dataNotification}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                loading={loading}
                setLoading={setLoading}
            />
        </>
    );
}

export default Notification;