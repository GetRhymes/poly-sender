import React from 'react';
import {Checkbox} from "@mui/material";


function CheckBoxTable({id, isSelected, setSelectedStudents}) {


    function handleCheck(event) {
        setSelectedStudents((selectedStudents) => {
            const key = event.target.name
            const value = event.target.checked
            const list = {...selectedStudents}
            list[key] = value
            return list
        })
    }

    return (
        <Checkbox
            onClick={((event) => event.stopPropagation())}
            name={id}
            onChange={handleCheck}
            checked={isSelected}
        />
    );
}

export default CheckBoxTable;

