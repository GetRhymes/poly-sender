import React, {useEffect} from 'react';
import LabelInBlock from "./create/LabelInBlock";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useStateIfMounted} from "use-state-if-mounted";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

function SelectorGroup({selectedGroupName, handleSelector}) {

    useEffect(() => {
        fetchDataGroupNames()
    }, [])

    const [dataGroupNames, setDataGroupNames] = useStateIfMounted([])

    async function fetchDataGroupNames() {
        const dataGroupNames = await axios('http://localhost:8080/attributes/getGroupNamesCurrentStaff');
        setDataGroupNames(dataGroupNames.data);
    }

    return (
        dataGroupNames.length === 0 ?
            <LoadingScreen/>
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

