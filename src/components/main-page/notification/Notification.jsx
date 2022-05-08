import React, {useContext, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useStateIfMounted} from "use-state-if-mounted";
import NotificationPopover from "./NotoficationPopover";
import {fetchNotification} from "../../../util/AsyncFunctionStaff";
import {PathContext} from "../../../context";

function Notification() {

    const [anchorEl, setAnchorEl] = useState(null);

    const [loading, setLoading] = useState(false)

    const [dataNotification, setDataNotification] = useStateIfMounted([])

    const {handleAccess} = useContext(PathContext)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        fetchNotification(setLoading, setDataNotification, handleAccess)
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
                setData={setDataNotification}
            />
        </>
    );
}

export default Notification;