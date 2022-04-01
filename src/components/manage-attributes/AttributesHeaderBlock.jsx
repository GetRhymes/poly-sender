import React from 'react';
import {Autocomplete, Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonCreate from "../ButtonCreate";

function AttributesHeaderBlock({setPopupCreateActive, setId, handleSearchValue, dataGroupNames, handleGroupName}) {

    const containerStyle = {
        marginTop: "10px",
        display: 'flex',
        alignItems: 'flex-end',
        height: "30px",
        justifyContent: "space-between"
    }

    const containerFilters = {
        display: "flex",
        flexDirection: "row"
    }

    const adornment = (
        <InputAdornment position="start">
            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        </InputAdornment>
    )

    return (
        <Box sx={containerStyle}>
            <Box sx={containerFilters}>
                <TextField
                    onChange={handleSearchValue}
                    variant="standard"
                    label="Введите название атрибута"
                    sx={{width: "300px"}}
                    InputProps={{startAdornment: (adornment)}}
                />
                <Autocomplete
                    clearOnEscape
                    options={dataGroupNames}
                    onChange={(event, value) => handleGroupName(value)}
                    sx={{ width: 300, marginLeft: "20px" }}
                    renderInput={(params) => (
                        <TextField {...params} label="Выберите раздел" variant="standard"/>
                    )}
                />
            </Box>
            <ButtonCreate
                setActive={setPopupCreateActive}
                setId={setId}
            />
        </Box>
    );
}

export default AttributesHeaderBlock;