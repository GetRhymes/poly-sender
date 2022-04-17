import React, {useState} from 'react';
import '../../styles/Create.css'
import {useNavigate} from "react-router-dom";
import PopupButton from "./PopupButton";
import PopupToggleButtonGroup from "./PopupToggleButtonGroup";
import {FormControl, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function PopupCreate({active, setActive, endPoint, setLoading, dataGroupNames}) {

    const [way, setWay] = useState(null);

    const [select, setSelect] = useState(() => {
        if (endPoint === "attributes") {
            if (dataGroupNames.length > 0) return endPoint
            else return "group"
        } else return endPoint
    })

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

    const [incorrectGroupName, setIncorrectGroupName] = useState(false)

    const [uniqueGroupName, setUniqueGroupName] = useState(true)

    let navigate = useNavigate();

    function redirect() {
        let path = "/" + endPoint + "/" + way
        navigate(path);
    }

    async function createGroupName(groupName) {
        setLoading(true)
        await axios.post("http://localhost:8080/attributes/createGroupName", groupName)
        setLoading(false)
    }

    function createGroup() {
        if (!/[^a-zA-Zа-яА-Я_0-9\s]+/.test(groupName)) {
            const finder = dataGroupNames.find((item) => item.groupName.toLowerCase() === groupName.toLowerCase())
            if (finder === undefined) {
                createGroupName({groupName})
                setIncorrectGroupName(false)
                setActive(false)
            } else setUniqueGroupName(false)
        } else setIncorrectGroupName(true)
    }

    function createField() {
        if (way != null) {
            setActive(false)
            redirect()
        }
    }

    return (
        <div className={active ? "popup active" : "popup"} onClick={() => {
            setActive(false)
            setWay(null)
            setIncorrectGroupName(false)
            setGroupName("")
        }}>
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div>
                    <p className="popup__label">Конфигуратор</p>
                    <div className="popup__configuration__block">
                        <Selector select={select} setSelect={handleSelector} endPoint={endPoint} dataGroupNames={dataGroupNames}/>
                        {
                            select === "group" ?
                                <TextFieldGroupName groupName={groupName} setGroupName={handleGroupName} incorrectGroupName={incorrectGroupName} uniqueGroupName={uniqueGroupName}/>
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
                            setIncorrectGroupName(false)
                            setGroupName("")
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

function Selector({select, setSelect, endPoint, dataGroupNames}) {

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
                {endPoint === "attributes" ? <MenuItem value="group">Раздел</MenuItem> : null}
                {endPoint === "attributes" && dataGroupNames.length > 0 ? <MenuItem value={endPoint}>Атрибут</MenuItem> : null}
                {endPoint === "filters" ? <MenuItem value={endPoint}>Фильтр</MenuItem> : null}
            </Select>
        </FormControl>
    );
}

function TextFieldGroupName({groupName, setGroupName, incorrectGroupName, uniqueGroupName}) {

    const styleTextField = {
        marginTop: "22.5px",
        width: "250px"
    }

    return (
        <TextField
            sx={styleTextField}
            focused={true}
            color={incorrectGroupName || !uniqueGroupName ? "error" : null}
            label={incorrectGroupName ? "Запрещенные символы" : uniqueGroupName ? "Название раздела" : "Раздел уже существует"}
            variant="outlined"
            value={groupName}
            onChange={setGroupName}
        />
    );
}

export default PopupCreate;