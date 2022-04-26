import {Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

function AccessHeaderBlock({handleSearch}) {
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
                onChange={handleSearch}
                variant="standard"
                label="Введите ФИО"
                sx={{width: "300px"}}
                InputProps={{startAdornment: (adornment)}}
            />
        </Box>
    );
}

export default AccessHeaderBlock;