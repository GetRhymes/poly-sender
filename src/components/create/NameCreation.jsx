import LabelInBlock from "./LabelInBlock";
import {TextField} from "@mui/material";
import React from "react";

function NameCreation({name, handle, correctName, isFilter, unique}) {
    return (
        <div className="background__card">
            <LabelInBlock label={"Название"}/>
            <TextField
                focused={true}
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
                color={correctName && unique ? null : 'error'}
                label=
                    {
                        !isFilter ?
                            correctName ?
                                unique ? "Введите название атрибута" : "Название уже используется"
                                :
                                "Запрещенные символы"
                            :
                            correctName ?
                                unique ? "Введите название фильтра" : "Название уже используется"
                                :
                                "Запрещенные символы"
                    }
            />
        </div>
    );
}

export default NameCreation;