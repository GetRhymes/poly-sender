import LabelInBlock from "./LabelInBlock";
import {TextField} from "@mui/material";
import React from "react";

function NameCreation({name, handle}) {
    return (
        <div className="background__card">
            <LabelInBlock label={"Название"}/>
            <TextField
                name={name}
                value={name}
                onChange={handle}
                InputProps={{
                    sx: {
                        borderRadius: "12px",
                        width: "400px",
                        height: "50px"
                    }
                }}
                fullWidth
                label="Введите название нового атрибута" id="fullWidth"/>
        </div>
    );
}

export default NameCreation;