import React, {useContext} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {deleteItem} from "../util/Utils";
import {PathContext} from "../context";

function ButtonActionGroup(
    {
        orientation,
        endPoint,
        type,
        id,
        setId,
        setPopupShareActive,
        name,
        setName,
        selectedOption,
        setSelectedOption,
        setLoading,
        link,
        basic
    }
) {

    let navigate = useNavigate();

    function redirect() {
        let path = "/" + endPoint + "/" + type
        navigate(path);
    }

    const {handleAccess} = useContext(PathContext)

    return (
        <ButtonGroup orientation={orientation} sx={{boxShadow: "unset", borderRadius: "12px"}}>
            <Button disabled={link || basic} onClick={() => {
                redirect()
                setName(name)
                setId(id)
                setSelectedOption(selectedOption) // mailOption or groupName
            }}>
                <EditIcon/>
            </Button>
            <Button disabled={link || basic} onClick={() => {
                setPopupShareActive(true)
                setId(id)
            }}>
                <ShareIcon/>
            </Button>
            <Button onClick={() => deleteItem(id, setLoading, endPoint, orientation, handleAccess)}>
                <DeleteIcon/>
            </Button>
        </ButtonGroup>
    );
}

export default ButtonActionGroup;