import React, {useContext} from 'react';
import {Button} from "@mui/material";
import '../../styles/CreationPages.css'
import {useNavigate} from "react-router-dom";
import {createAttribute, updateAttribute} from "../../util/AsyncFunctionAttributes";
import {createFilter, updateFilter} from "../../util/AsyncFunctionFilters";
import {PathContext} from "../../context";

function EndBlock(
    {
        name,
        selectedStudents,
        mailOption,
        selectedGroupName,
        id,
        setLoading,
        expression,
        setStatus,
        setCorrectName,
        unique,
        setUnique,
        data
    }
) {
    return (
        <div className="background__card end__block">
            <div className="header__label counter">
                {
                    expression === undefined ?
                        <p>Выбрано студентов: {arraySelectedStudents(selectedStudents).length}</p>
                        :
                        null
                }

            </div>
            <ButtonEnd
                name={name}
                selectedStudents={selectedStudents}
                mailOption={mailOption}
                selectedGroupName={selectedGroupName}
                id={id}
                setLoading={setLoading}
                expression={expression}
                setStatus={setStatus}
                setCorrectName={setCorrectName}
                unique={unique}
                setUnique={setUnique}
                data={data}
            />
        </div>
    );
}

function ButtonEnd(
    {
        name,
        selectedStudents,
        mailOption,
        selectedGroupName,
        id,
        setLoading,
        expression,
        setStatus,
        setCorrectName,
        setUnique,
        data
    }
) {

    let navigate = useNavigate();

    const endPoint = mailOption !== undefined ? "filters" : "attributes"

    function redirect() {
        let path = "/" + endPoint
        navigate(path);
    }

    const {handleAccess} = useContext(PathContext)

    return (
        <Button
            onClick={() => {
                let localUnique = true
                const checkStudents = (expression !== undefined && expression !== "") ||
                    (selectedStudents !== undefined && arraySelectedStudents(selectedStudents).length > 0)

                const checkSelectedOption = (selectedGroupName !== undefined && selectedGroupName !== "") ||
                    (mailOption !== undefined && mailOption !== "")

                const checkCorrectName = !/[^a-zA-Zа-яА-Я0-9\\\s/]+/.test(name)
                const type = mailOption !== undefined ? "filter" : "attribute"
                if (!checkUnique(name, data, type, selectedGroupName, id)) {
                    setUnique(() => {
                        localUnique = false
                        return false
                    })
                } else setUnique(true)
                if (!checkCorrectName) {
                    setCorrectName(false)
                } else setCorrectName(true)

                if (checkStudents && checkSelectedOption && checkCorrectName && localUnique && name.replace(/\s+/, '').length > 0) {
                    id !== null ?
                        mailOption !== undefined ?
                            updateFilter(id, name, selectedStudents, mailOption, setLoading, redirect, expression, setStatus, arraySelectedStudents, handleAccess)
                            :
                            updateAttribute(id, name, selectedStudents, selectedGroupName, setLoading, redirect, expression, setStatus, arraySelectedStudents, handleAccess)
                        :
                        mailOption !== undefined ?
                            createFilter(name, selectedStudents, mailOption, setLoading, redirect, expression, setStatus, arraySelectedStudents, handleAccess)
                            :
                            createAttribute(name, selectedStudents, selectedGroupName, setLoading, redirect, expression, setStatus, arraySelectedStudents, handleAccess)
                    setCorrectName(true)
                }
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

function checkUnique(name, listNames, type, groupName, id) {
    if (type === "filter") {
        const needFilter = listNames.find((filter) =>
            filter.filterName.replaceAll(/\s+/g, "_").toLowerCase() === name.replaceAll(/\s+/g, "_").toLowerCase()
        )
        return needFilter === undefined || (id !== undefined && id === needFilter.id)
    } else {
        const needAttr = listNames.find(
            (item) => item.attributeName.replaceAll(/\s+/g, "_").toLowerCase() === name.replaceAll(/\s+/g, "_").toLowerCase() &&
                groupName.replaceAll(/\s+/g, "_").toLowerCase() === item.groupName.replaceAll(/\s+/g, "_").toLowerCase()
        )
        return needAttr === undefined || (id !== null && id === needAttr.id)
    }
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

export default EndBlock;