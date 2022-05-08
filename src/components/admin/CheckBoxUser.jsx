import React from 'react';
import {Checkbox} from "@mui/material";

function CheckboxUser({id, checked}) {
    return (
        <Checkbox
            name={id}
            checked={checked}
        />
    );
}

export default CheckboxUser;