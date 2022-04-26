import React, {useContext, useEffect} from 'react';
import LoadingScreen from "../../components/LoadingScreen";
import {Container} from "@mui/material";
import HeaderBlock from "../../components/create/HeaderBlock";
import EndBlock from "../../components/create/EndBlock";
import PopupLoading from "../../components/PopupLoading";
import {useStateIfMounted} from "use-state-if-mounted";
import ExpressionBlock from "../../components/create/way-expression/ExpressionBlock";
import PopupCheckInfo from "../../components/create/way-expression/PopupCheckInfo";
import PopupStudentsList from "../../components/create/way-expression/PopupStudentsList";
import {PathContext} from "../../context";
import {
    fetchDataAttributeById,
    fetchDataAttributesCurrentStaff,
    fetchDataFunctions
} from "../../util/AsyncFunctionAttributes";

function AttributesExpression(
    {
        id,
        nameAttribute,
        setNameAttribute,
        selectedGroupName,
        setSelectedGroupName,
        setCurrentIdAttribute,
        expression,
        setExpression,
    }
) {

    const [dataFunctions, setDataFunctions] = useStateIfMounted([])

    const [dataAttributes, setDataAttributes] = useStateIfMounted([])

    const [students, setStudents] = useStateIfMounted(null)

    const {setRootPath, setCreate} = useContext(PathContext)

    useEffect(() => {
        fetchDataFunctions(setDataFunctions)
        fetchDataAttributesCurrentStaff(setLoadingAttributes, setDataAttributes)
        setCreate(true)
        setRootPath("Атрибуты")
        if (id !== null) {
            fetchDataAttributeById(id, setNameAttribute, setSelectedGroupName, setExpression, setStudents)
        }
        return () => {
            setSelectedGroupName("")
            setCurrentIdAttribute(null)
            setExpression("")
            setNameAttribute("")
            setCreate(false)
            setRootPath("")
        }
    }, [])

    function handleExpression(event) {
        let expr = event.target.value
        const oldLength = expression.length
        const newPosition = expr.length > oldLength ?
            event.target.selectionEnd + (expr.length - oldLength - 1)
            :
            event.target.selectionEnd - (oldLength - expr.length - 1)
        if (expr.substring(newPosition - 1, newPosition) === '(' && oldLength < expr.length) {
            expr = expr.substring(0, newPosition) + ')' + expr.substring(newPosition)
        }
        if (expr.substring(newPosition - 1, newPosition) === '[' && oldLength < expr.length) {
            expr = expr.substring(0, newPosition) + ']' + expr.substring(newPosition)
        }
        setExpression(expr)
        setPosition(newPosition)
    }

    function handleSelectedGroupName(event) {
        const groupName = event.target.value
        setSelectedGroupName(groupName)
    }

    function handleAttributesName(event) {
        const name = event.target.value
        setNameAttribute(name)
    }

    const [position, setPosition] = useStateIfMounted(0)

    const [loading, setLoading] = useStateIfMounted(false)

    const [checkAbout, setCheckAbout] = useStateIfMounted(false)

    const [infoStudents, setInfoStudents] = useStateIfMounted(false)

    const [status, setStatus] = useStateIfMounted(null)

    const [correctName, setCorrectName] = useStateIfMounted(true)

    const [unique, setUnique] = useStateIfMounted(true)

    const [loadingAttributes, setLoadingAttributes] = useStateIfMounted(false)

    const isLoading = (students === null && id !== null) || dataFunctions.length === 0 || loadingAttributes

    return (
        isLoading ?
            <LoadingScreen/>
            :
            <Container maxWidth="lg">
                <HeaderBlock
                    name={nameAttribute}
                    handle={handleAttributesName}
                    isFilter={false}
                    selectedGroupName={selectedGroupName}
                    handleSelector={handleSelectedGroupName}
                    correctName={correctName}
                    unique={unique}
                />
                <ExpressionBlock
                    expression={expression}
                    handleExpression={handleExpression}
                    setExpression={setExpression}
                    dataFunctions={dataFunctions}
                    height={590}
                    position={position}
                    setPosition={setPosition}
                    setLoading={setLoading}
                    status={status}
                    setStatus={setStatus}
                    students={students}
                    setStudents={setStudents}
                    setCheckAbout={setCheckAbout}
                    setInfoStudents={setInfoStudents}
                />
                <EndBlock
                    name={nameAttribute}
                    selectedGroupName={selectedGroupName}
                    id={id}
                    setLoading={setLoading}
                    expression={expression}
                    setStatus={setStatus}
                    setCorrectName={setCorrectName}
                    unique={unique}
                    setUnique={setUnique}
                    data={dataAttributes}
                />
                <PopupLoading active={loading}/>
                <PopupCheckInfo active={checkAbout} setPopupActive={setCheckAbout}/>
                <PopupStudentsList active={infoStudents} setActive={setInfoStudents} students={students}/>
            </Container>
    );
}

export default AttributesExpression;