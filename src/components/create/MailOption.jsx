import React from 'react';
import '../../styles/CreationPages.css'
import LabelInBlock from "./LabelInBlock";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

function MailOption({mailOption, handleMailOption}) {
    return (
        <div className="background__card">
            <LabelInBlock label={"Получение почты"}/>
            <OptionsVariant mailOption={mailOption} handleMailOption={handleMailOption}/>
        </div>
    );
}

function OptionsVariant({mailOption, handleMailOption}) {
    return (
        <RadioGroup
            value={mailOption}
            onChange={handleMailOption}
        >
            <FormControlLabel sx={{ height: "30px"}} value="auto" control={<Radio />} label="Автоматическая пересылка" />
            <FormControlLabel sx={{ height: "30px"}} value="manual" control={<Radio />} label="Ручная пересылка" />
            <FormControlLabel sx={{ height: "30px"}} value="no-reply" control={<Radio />} label="Не получать письма" />
        </RadioGroup>
    );
}

export default MailOption;