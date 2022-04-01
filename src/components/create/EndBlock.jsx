import React from 'react';
import {Button} from "@mui/material";
import '../../styles/CreationPages.css'
import axios from "axios";

function EndBlock({name, selectedStudents, mailOption, selectedGroupName}) {
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
            />
        </div>
    );
}

function ButtonEnd({name, selectedStudents, mailOption, selectedGroupName}) {
    return (
        <Button
            onClick={() => {
                mailOption !== undefined ?
                    createFilter(name, selectedStudents, mailOption)
                    :
                    createAttribute(name, selectedStudents, selectedGroupName)
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
            <p className="text__button">Создать</p>
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

async function createAttribute(nameAttribute, selectedStudents, selectedGroupAttribute) {
    const newAttribute = {
        name: nameAttribute,
        groupName: selectedGroupAttribute,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    console.log(newAttribute)
    await axios.post("http://localhost:8080/attributes/createAttribute", newAttribute)
}

async function createFilter(nameFilter, selectedStudents, mailOption) {
    const newFilter = {
        name: nameFilter,
        mailOption: mailOption,
        studentsId: arraySelectedStudents(selectedStudents)
    }
    console.log(newFilter)
    // await axios.post("http://localhost:8080/attributes/createFilter", newFilter)
}

export default EndBlock;