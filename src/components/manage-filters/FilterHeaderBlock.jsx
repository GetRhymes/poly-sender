import React from 'react';
import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonCreate from "../ButtonCreate";

function FilterHeaderBlock({popupCreateActive, setPopupCreateActive, handleSearchValue}) {

    const containerStyle = {
        marginTop: "10px",
        display: 'flex',
        alignItems: 'flex-end',
        height: "30px",
        justifyContent: "space-between"
    }

    const adornment = (
        <InputAdornment position="start">
            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        </InputAdornment>
    )

    return (
        <Box sx={containerStyle}>
            <TextField
                onChange={handleSearchValue}
                variant="standard"
                label="Введите название фильтра"
                sx={{width: "300px"}}
                InputProps={{startAdornment: (adornment)}}
            />
            <ButtonCreate active={popupCreateActive} setActive={setPopupCreateActive}/>
        </Box>
    );
}

export default FilterHeaderBlock;