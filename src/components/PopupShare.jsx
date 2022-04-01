import React from 'react';
import PopupButton from "./create/PopupButton";
import '../styles/Create.css'
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {dataStaff} from "./data/data";

function PopupShare({active, setActive}) {

    return (
        <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
            <div className="popup__share__content" onClick={e => e.stopPropagation()}>
                <div>
                    <p className="popup__label">Поделиться аттрибутом</p>
                    <div className="popup__share__body">
                        <Autocomplete
                            sx={{marginTop: "10px"}}
                            multiple
                            disablePortal={true}
                            id="tags-outlined"
                            options={dataStaff}
                            getOptionLabel={(option) => option.label}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Выберите сотрудника"
                                    placeholder="Новый сотрудник"
                                />
                            )}
                        />
                    </div>
                    <div className="popup__share_button">
                        <PopupShareButton text="Поделиться" action={() => {
                            setActive(false)
                        }}/>
                        <PopupShareButton text="Закрыть" action={() => {
                            setActive(false)
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PopupShareButton({text, action}) {
    return (
        <Button
            sx={{
                backgroundColor: "#366ac3",
                color: "white",
                width: "120px",
                borderRadius: "13px",
                ":hover": {
                    color: "#ffffff",
                    backgroundColor: "#739ee8"
                }
            }}
            onClick={action}
        >
            {text}
        </Button>
    );
}


export default PopupShare;
