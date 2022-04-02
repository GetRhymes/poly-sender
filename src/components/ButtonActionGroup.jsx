import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
        setLoading
    }
) {

    let navigate = useNavigate();

    function redirect() {
        let path = "/" + endPoint + "/" + type
        navigate(path);
    }

    return (
        <ButtonGroup orientation={orientation} sx={{boxShadow: "unset", borderRadius: "12px"}}>
            <Button onClick={() => {
                redirect()
                setName(name)
                setId(id)
                setSelectedOption(selectedOption) // mailOption or groupName
            }}>
                <EditIcon/>
            </Button>
            <Button onClick={() => {
                setPopupShareActive(true)
            }}>
                <ShareIcon/>
            </Button>
            <Button onClick={() => {
                deleteItem(id, setLoading, endPoint, orientation)
            }}>
                <DeleteIcon/>
            </Button>
        </ButtonGroup>
    );
}

async function deleteItem(id, setLoading, endPoint, orientation) {
    setLoading(true)
    const item = endPoint === "attributes" ?
        {"idAttribute": id}
        :
        {"idFilter": id}
    const deleteEndPoint = endPoint + (orientation === "vertical" ? "/deleteAttribute" : "/deleteFilter")
    await axios.post("http://localhost:8080/" + deleteEndPoint, item)
    setLoading(false)
}

export default ButtonActionGroup;