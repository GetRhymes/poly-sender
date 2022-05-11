import React, {useContext} from 'react';
import {Autocomplete, Box, Checkbox, FormControlLabel, InputAdornment, TextField,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonCreate from "../ButtonCreate";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import {deleteGroupName} from "../../util/AsyncFunctionAttributes";
import {PathContext} from "../../context";

function AttributesHeaderBlock(
    {
        setPopupCreateActive,
        setId,
        handleSearchValue,
        dataGroupNames,
        handleGroupName,
        setLoading,
        basic,
        setBasic
    }
) {

    const containerStyle = {
        display: 'flex',
        alignItems: 'flex-end',
        height: "55px",
        justifyContent: "space-between"
    }

    const containerFilters = {
        display: "flex",
        flexDirection: "row"
    }

    const containerFiltersAndCheck = {
        display: "flex",
        flexDirection: "column",
        marginTop: "20px"
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

    const {handleAccess} = useContext(PathContext)

    const id = localStorage.getItem('idStaff')

    return (
        <Box sx={containerStyle}>
            <Box sx={containerFiltersAndCheck}>
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
                                {
                                    option.idStaff === id ?
                                        <IconButton onClick={((event) => {
                                            event.stopPropagation()
                                            deleteGroupName(option.idGroupName, setLoading, handleAccess)
                                        })}>
                                            <ClearIcon/>
                                        </IconButton>
                                        :
                                        null
                                }
                            </div>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Выберите раздел" variant="standard"/>
                        )}
                    />
                </Box>
                <FormControlLabel
                    sx={{
                        marginTop: "10px",
                        height: "25px",
                    }}
                    value="end"
                    control={<Checkbox checked={basic} onChange={(event) => {
                        setBasic(event.target.checked)
                    }}/>}
                    label="Бызовые атрибуты"
                    labelPlacement="end"
                />
            </Box>
            <ButtonCreate
                setActive={setPopupCreateActive}
                setId={setId}
                isAttr={true}
            />
        </Box>
    );
}

export default AttributesHeaderBlock;