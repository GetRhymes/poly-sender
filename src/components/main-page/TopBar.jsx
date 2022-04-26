import React, {useContext} from 'react';
import '../../styles/TopBar.css'
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DropMenu from "./DropMenu";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {PathContext} from "../../context";
import Notification from "./notification/Notification";

function TopBar({open, handleDrawerOpen}) {

    const {rootPath, create} = useContext(PathContext)

    return (
        <div className="top__bar">
            <div className="label__block">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        color: 'white',
                        marginLeft: "12px",
                        marginTop: "12.5px",
                        marginBottom: "12.5px",
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Path label={rootPath}/>
                {create ? <Path label="Создать"/> : null}

            </div>
            <div className="notification">
                <Notification/>
            </div>
            <div className="drop__menu">
                <DropMenu/>
            </div>
        </div>
    );
}

export default TopBar;


function Path({label}) {
    return (
        <div className="path__block">
            <ArrowRightIcon fontSize="large" sx={{marginLeft: "10px"}}/>
            <p className="label__sidebar">{label}</p>
        </div>
    );
}