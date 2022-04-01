import React, {useState} from 'react';
import '../../styles/Create.css'
import {useNavigate} from "react-router-dom";
import PopupButton from "./PopupButton";
import PopupToggleButtonGroup from "./PopupToggleButtonGroup";
import {FormControl, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function PopupCreate({active, setActive, endPoint}) {

    const [way, setWay] = useState(null);

    const [select, setSelect] = useState(endPoint)

    const [groupName, setGroupName] = useState("")

    function handleGroupName(event) {
        setGroupName(event.target.value)
    }

    function handleSelector(event) {
        setSelect(event.target.value)
    }

    const handleChangeWay = (event, way) => {
        setWay(way);
    };

    let navigate = useNavigate();

    function redirect() {
        let path = "/" + endPoint + "/" + way
        navigate(path);
    }

    async function createGroupName(groupName) {
        console.log(groupName)
        await axios.post("http://localhost:8080/attributes/createGroupName", groupName)
    }

    function createGroup() {
        if (groupName !== "") {
            createGroupName({groupName})
            setActive(false)
        }
    }

    function createField() {
        if (way != null) {
            setActive(false)
            redirect()
        }
    }

    return (
        <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div>
                    <p className="popup__label">Конфигуратор</p>
                    <div className="popup__configuration__block">
                        <Selector select={select} setSelect={handleSelector} endPoint={endPoint}/>
                        {
                            select === "group" ?
                                <TextFieldGroupName groupName={groupName} setGroupName={handleGroupName}/>
                                :
                                <ConfigurationButtons way={way} handleChangeWay={handleChangeWay}/>
                        }
                    </div>
                    <div className="popup__buttons">
                        <PopupButton text="Создать" action={() => {
                            select === "group" ?
                                createGroup()
                                :
                                createField()
                        }}/>
                        <PopupButton text="Закрыть" action={() => {
                            setActive(false)
                            setWay(null)
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ConfigurationButtons({way, handleChangeWay}) {
    return (
        <PopupToggleButtonGroup
            action={way}
            handle={handleChangeWay}
            leftName="Из списка"
            leftValue="list"
            rightName="Выражение"
            rightValue="expression"
        />
    );
}

function Selector({select, setSelect, endPoint}) {

    const styleSelector = {
        marginTop: "15px",
        width: "250px"
    }

    return (
        <FormControl sx={styleSelector} >
            <Select
                value={select}
                onChange={setSelect}
            >
                <MenuItem value={endPoint}>{endPoint === "attributes" ? "Атрибут" : "Фильтр"}</MenuItem>
                {endPoint === "attributes" ? <MenuItem value="group">Раздел</MenuItem> : null}
            </Select>
        </FormControl>
    );
}

function TextFieldGroupName({groupName, setGroupName}) {

    const styleTextField = {
        marginTop: "22.5px",
        width: "250px"
    }

    return (
        <TextField
            sx={styleTextField}
            label="Название раздела"
            variant="outlined"
            // value={groupName}
            onChange={setGroupName}
        />
    );
}

export default PopupCreate;