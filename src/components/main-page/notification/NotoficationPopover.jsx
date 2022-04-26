import React from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import NotificationItem from "./NotificationItem";
import {Popover} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function NotificationPopover({loading, setLoading, dataNotification, anchorEl, setAnchorEl, setData}) {

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
            disablePortal={true}>
            {
                loading ?
                    <LoadingPopover/>
                    :
                    dataNotification.length === 0 ?
                        <EmptyPopover/>
                        :
                        <div className="popover__content">
                            <Divider/>
                            <List
                                sx={{width: "100%", height: "calc(100%)", overflow: "auto"}}>
                                {dataNotification.map((notification) =>
                                    <NotificationItem
                                        notification={notification}
                                        setLoading={setLoading}
                                        setData={setData}
                                    />
                                )}
                            </List>
                        </div>
            }
        </Popover>
    );
}

function LoadingPopover() {
    return (
        <div className="loading__popover">
            <CircularProgress/>
        </div>
    )
}

function EmptyPopover() {
    return (
        <div className="loading__popover">
            <p className="empty__popover__label">Пусто</p>
        </div>
    )
}

export default NotificationPopover;