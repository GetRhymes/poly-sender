import React from 'react';
import {Autocomplete, Box, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonCreate from "../ButtonCreate";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";

function AttributesHeaderBlock(
    {
        setPopupCreateActive,
        setId,
        handleSearchValue,
        dataGroupNames,
        handleGroupName,
        setLoading,
    }
) {

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

    const styleOption = {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    }

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
                    disabled={dataGroupNames.length === 0}
                    getOptionLabel={(option) => option.groupName}
                    options={dataGroupNames}
                    onChange={(event, value) => handleGroupName(value)}
                    sx={{width: 300, marginLeft: "20px"}}
                    renderOption={(props, option) => (
                        <div {...props} style={styleOption}>
                            {option.groupName}
                            <IconButton onClick={((event) => {
                                event.stopPropagation()
                                deleteGroupName(option.idGroupName, setLoading)
                            })}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                    )}
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

async function deleteGroupName(id, setLoading) {
    setLoading(true)
    const data = { "idGroupAttribute": id }
    await axios.post("http://localhost:8080/attributes/deleteGroupAttribute", data)
    setLoading(false)
}

export default AttributesHeaderBlock;