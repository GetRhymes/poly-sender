import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";

function ButtonActionGroup({orientation, endPoint, type, id, setId, setPopupShareActive, nameAttribute, setNameAttribute, selectedGroupName, setSelectedGroupName}) {

    let navigate = useNavigate();

    function redirect() {
        let path = "/" + endPoint + "/" + type
        navigate(path);
    }

    return (
        <ButtonGroup orientation={orientation} sx={{boxShadow: "unset", borderRadius: "12px"}}>
            <Button onClick={() => {
                redirect()
                setNameAttribute(nameAttribute)
                setSelectedGroupName(selectedGroupName)
                setId(id)
            }}>
                <EditIcon/>
            </Button>
            <Button onClick={() => { setPopupShareActive(true) }}>
                <ShareIcon/>
            </Button>
            <Button>
                <DeleteIcon/>
            </Button>
        </ButtonGroup>
    );
}

export default ButtonActionGroup;