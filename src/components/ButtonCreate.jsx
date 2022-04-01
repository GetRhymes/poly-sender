import React from 'react';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ButtonCreate({setActive, setId}) {

    const buttonStyle = {
        marginTop: "20px",
        marginLeft: "20px",
        paddingRight: "13px",
        borderRadius: "30px",
        backgroundColor: "#366ac3",
        color: "white",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        ":hover": {
            color: "#ffffff",
            backgroundColor: "#739ee8"
        }
    }

    return (
        <Button onClick={() => {
            setActive(true)
            setId(null)
        }} sx={buttonStyle}>
            <AddIcon fontSize="large"/>
            <p className="text__button">Создать</p>
        </Button>
    );
}

export default ButtonCreate;