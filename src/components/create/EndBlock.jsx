import React from 'react';
import {Button} from "@mui/material";
import '../../styles/CreationPages.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EndBlock(
    {
        name,
        selectedStudents,
        mailOption,
        selectedGroupName,
        id,
        setLoading
    }
) {
    return (
        <div className="background__card end__block">
            <div className="header__label counter">
                <p>Выбрано студентов: {arraySelectedStudents(selectedStudents).length}</p>
            </div>
            <ButtonEnd
                name={name}
                selectedStudents={selectedStudents}
                mailOption={mailOption}
                selectedGroupName={selectedGroupName}
                id={id}
                setLoading={setLoading}
            />
        </div>
    );
}

function ButtonEnd({name, selectedStudents, mailOption, selectedGroupName, id, setLoading}) {

    let navigate = useNavigate();

    const endPoint = mailOption !== undefined ? "filters" : "attributes"

    function redirect() {
        let path = "/" + endPoint
        navigate(path);
    }

    return (
        <Button
            onClick={() => {
                id !== null ?
                    mailOption !== undefined ?
                        updateFilter(id, name, selectedStudents, mailOption, setLoading, redirect)
                        :
                        updateAttribute(id, name, selectedStudents, selectedGroupName, setLoading, redirect)
                    :
                    mailOption !== undefined ?
                        createFilter(name, selectedStudents, mailOption, setLoading, redirect)
                        :
                        createAttribute(name, selectedStudents, selectedGroupName, setLoading, redirect)
            }}
            sx={{
                paddingRight: "10px",
                position: "initial",
                paddingLeft: "10px",
                width: "120px",
                height: "38.5px",
                borderRadius: "12px",
                backgroundColor: "#366ac3",
                color: "white",
                ":hover": {
                    color: "#ffffff",
                    backgroundColor: "#739ee8"
                }
            }}
        >
            <p className="text__button">{id === null ? "Создать" : "Сохранить"}</p>
        </Button>
    );
}

function arraySelectedStudents(selectedStudents) {
    let arrayStudentsId = []
    let arraySelectedStudents = Object.entries(selectedStudents)

    for (let student of arraySelectedStudents) {
        if (student[1]) {
            arrayStudentsId.push(student[0])
        }
    }
    return arrayStudentsId
}

async function createAttribute(nameAttribute, selectedStudents, selectedGroupAttribute, setLoading, redirect) {
    setLoading(true)
    const newAttribute = {
        name: nameAttribute,
        groupName: selectedGroupAttribute,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    await axios.post("http://localhost:8080/attributes/createAttribute", newAttribute)
    setLoading(false)
    redirect()
}

async function updateAttribute(
    idAttribute,
    nameAttribute,
    selectedStudents,
    selectedGroupAttribute,
    setLoading,
    redirect
) {
    setLoading(true)
    const newAttribute = {
        idAttribute: idAttribute,
        name: nameAttribute,
        groupName: selectedGroupAttribute,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    await axios.post("http://localhost:8080/attributes/updateAttribute", newAttribute)
    setLoading(false)
    redirect()
}

async function createFilter(nameFilter, selectedStudents, mailOption, setLoading, redirect) {
    setLoading(true)
    const newFilter = {
        name: nameFilter,
        mailOption: mailOption,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    await axios.post("http://localhost:8080/filters/createFilter", newFilter)
    setLoading(false)
    redirect()
}

async function updateFilter(idFilter, nameFilter, selectedStudents, mailOption, setLoading, redirect) {
    setLoading(true)
    const newFilter = {
        idFilter: idFilter,
        name: nameFilter,
        mailOption: mailOption,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    await axios.post("http://localhost:8080/filters/updateFilter", newFilter)
    setLoading(false)
    redirect()
}

export default EndBlock;