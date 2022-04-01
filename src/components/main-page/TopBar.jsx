import React from 'react';
import '../../styles/TopBar.css'
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DropMenu from "./DropMenu";

function TopBar({open, handleDrawerOpen}) {

    return (
        <>
            <div className="top__bar">
                <div>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            // display: "flex",
                            marginLeft: "12px",
                            marginTop: "12.5px",
                            marginBottom: "12.5px",
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                </div>
                <div className="drop__menu">
                    <DropMenu/>
                </div>
            </div>
        </>
    );
}

export default TopBar;