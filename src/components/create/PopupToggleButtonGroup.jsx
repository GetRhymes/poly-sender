import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React from "react";

function PopupToggleButtonGroup({action, handle, leftValue, rightValue, leftName, rightName}) {
    return (
        <ToggleButtonGroup
            color="primary"
            value={action}
            exclusive
            onChange={handle}
            sx={{
                justifyContent: "center",
                display: "flex",
                marginTop: "15px",
                marginBottom: "15px"
            }}
        >
            <ToggleButton
                value={leftValue}
                sx={{
                    width: "125px"
                }}
            >
                {leftName}
            </ToggleButton>
            <ToggleButton
                value={rightValue}
                sx={{
                    width: "125px"
                }}
            >
                {rightName}
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default PopupToggleButtonGroup;