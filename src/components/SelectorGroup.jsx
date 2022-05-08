import React, {useContext, useEffect, useState} from 'react';
import LabelInBlock from "./create/LabelInBlock";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useStateIfMounted} from "use-state-if-mounted";
import {fetchDataGroupNames} from "../util/AsyncFunctionAttributes";
import {PathContext} from "../context";

function SelectorGroup({selectedGroupName, handleSelector}) {

    const {handleAccess} = useContext(PathContext)

    useEffect(() => {
        fetchDataGroupNames(setLoading, setDataGroupNames, handleAccess)
    }, [])

    const [dataGroupNames, setDataGroupNames] = useStateIfMounted([])

    const [loading, setLoading] = useState(false)

    return (
        loading ?
            null
            :
        <div className="background__card">
            <LabelInBlock label="Выбор раздела"/>
            <FormControl>
                <InputLabel>Выберите раздел</InputLabel>
                <Select
                    sx={{width: "250px"}}
                    value={selectedGroupName}
                    label="Выберите раздел"
                    onChange={handleSelector}
                >
                    {
                        dataGroupNames.map(({idGroupName, groupName}) => {
                            return <MenuItem key={idGroupName} value={groupName}>{groupName}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectorGroup;

