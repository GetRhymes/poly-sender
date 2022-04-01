import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import {Menu} from "@mui/material";
import '../../styles/TopBar.css'

function DropMenu() { //todo refactor

    // const [auth, setAuth] = React.useState(true);

    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                    component={Link}
                    to={"/profile"}
                    onClick={handleClose}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Профиль</ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={"/profile"}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Выйти</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export default DropMenu;