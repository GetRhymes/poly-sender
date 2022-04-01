import {Button} from "@mui/material";
import React from "react";

function PopupButton({text, action}) {
    return (
        <Button
            sx={{
                backgroundColor: "#366ac3",
                color: "white",
                width: "110px",
                borderRadius: "12px",
                ":hover": {
                    color: "#ffffff",
                    backgroundColor: "#739ee8"
                }
            }}
            onClick={action}>{text}
        </Button>
    );
}
export default PopupButton;